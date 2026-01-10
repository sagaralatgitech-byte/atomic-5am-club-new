/**
 * Test Suite: Archival & Data History System
 * Tests 3-month rolling window, archiving, and purging functionality
 */

// Mock localStorage for testing
let mockStorage = {};

const mockStorageApi = {
  get: async (key) => {
    return mockStorage[key] ? { value: mockStorage[key] } : null;
  },
  set: async (key, value) => {
    mockStorage[key] = value;
    return { key, value };
  },
  clear: () => {
    mockStorage = {};
  }
};

// Archive functions implementation
const archiveData = async (currentDate, weeklyGoals, gratitude, tasks) => {
  try {
    const timestamp = new Date().toISOString();
    const dateStr = currentDate;

    // Archive completed weekly goals
    const completedGoals = weeklyGoals.filter(g => g.completed && g.goal);
    if (completedGoals.length > 0) {
      const archiveKey = `archive-weekly-goals`;
      const archiveResult = await mockStorageApi.get(archiveKey);
      let archiveDataList = archiveResult && archiveResult.value ? JSON.parse(archiveResult.value) : [];
      
      completedGoals.forEach(goal => {
        archiveDataList.push({
          ...goal,
          completedDate: dateStr,
          archivedAt: timestamp
        });
      });
      
      await mockStorageApi.set(archiveKey, JSON.stringify(archiveDataList));
    }

    // Archive daily tasks
    const archivedTasks = tasks.filter(t => t.text);
    if (archivedTasks.length > 0) {
      const archiveKey = `archive-daily-tasks-${dateStr}`;
      const taskArchive = {
        date: dateStr,
        tasks: archivedTasks,
        archivedAt: timestamp
      };
      await mockStorageApi.set(archiveKey, JSON.stringify(taskArchive));
    }

    // Archive gratitudes
    const validGratitudes = gratitude.filter(g => g && g.trim());
    if (validGratitudes.length > 0) {
      const archiveKey = `archive-gratitudes`;
      const archiveResult = await mockStorageApi.get(archiveKey);
      let archiveDataList = archiveResult && archiveResult.value ? JSON.parse(archiveResult.value) : [];
      
      validGratitudes.forEach(g => {
        archiveDataList.push({
          text: g,
          date: dateStr,
          archivedAt: timestamp
        });
      });
      
      await mockStorageApi.set(archiveKey, JSON.stringify(archiveDataList));
    }
  } catch (error) {
    console.error('Error archiving data:', error);
  }
};

const getMonthsArchiveData = async (months = 3) => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - months);
    const cutoffDate = threeMonthsAgo.toISOString().split('T')[0];

    // Get archived weekly goals
    const weeklyResult = await mockStorageApi.get('archive-weekly-goals');
    const weeklyGoalsArchive = weeklyResult && weeklyResult.value ? JSON.parse(weeklyResult.value) : [];
    const recentWeeklyGoals = weeklyGoalsArchive.filter(g => g.completedDate >= cutoffDate);

    // Get archived gratitudes
    const gratitudeResult = await mockStorageApi.get('archive-gratitudes');
    const gratitudeArchive = gratitudeResult && gratitudeResult.value ? JSON.parse(gratitudeResult.value) : [];
    const recentGratitudes = gratitudeArchive.filter(g => g.date >= cutoffDate);

    // Get archived tasks from all dates
    const archivedTasks = [];
    const now = new Date();
    for (let i = 0; i < 90; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      if (dateStr < cutoffDate) break;
      
      const taskKey = `archive-daily-tasks-${dateStr}`;
      const taskResult = await mockStorageApi.get(taskKey);
      if (taskResult && taskResult.value) {
        const taskData = JSON.parse(taskResult.value);
        archivedTasks.push(taskData);
      }
    }

    return {
      weeklyGoals: recentWeeklyGoals,
      gratitudes: recentGratitudes,
      tasks: archivedTasks,
      cutoffDate
    };
  } catch (error) {
    console.error('Error retrieving archive data:', error);
    return { weeklyGoals: [], gratitudes: [], tasks: [], cutoffDate: null };
  }
};

const purgeOldData = async () => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const cutoffDate = threeMonthsAgo.toISOString().split('T')[0];

    // Purge weekly goals archive
    const weeklyResult = await mockStorageApi.get('archive-weekly-goals');
    if (weeklyResult && weeklyResult.value) {
      let archiveDataList = JSON.parse(weeklyResult.value);
      archiveDataList = archiveDataList.filter(g => g.completedDate >= cutoffDate);
      await mockStorageApi.set('archive-weekly-goals', JSON.stringify(archiveDataList));
    }

    // Purge gratitudes archive
    const gratitudeResult = await mockStorageApi.get('archive-gratitudes');
    if (gratitudeResult && gratitudeResult.value) {
      let archiveDataList = JSON.parse(gratitudeResult.value);
      archiveDataList = archiveDataList.filter(g => g.date >= cutoffDate);
      await mockStorageApi.set('archive-gratitudes', JSON.stringify(archiveDataList));
    }

    // Purge old task archives
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (dateStr < cutoffDate) {
        const taskKey = `archive-daily-tasks-${dateStr}`;
        if (mockStorage[taskKey]) {
          delete mockStorage[taskKey];
        }
      }
    }
  } catch (error) {
    console.error('Error purging old data:', error);
  }
};

// ============ TESTS ============

async function runTests() {
  let passed = 0;
  let failed = 0;

  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║       ARCHIVAL & DATA HISTORY SYSTEM TEST SUITE            ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  // Test 1: Archive weekly goals
  try {
    mockStorageApi.clear();
    const currentDate = '2025-12-15';
    const weeklyGoals = [
      { id: 1, goal: 'Complete project milestone', category: 'Career', completed: true },
      { id: 2, goal: 'Run 3 times', category: 'Health', completed: true },
      { id: 3, goal: 'Call family', category: 'Relationships', completed: false }
    ];
    
    await archiveData(currentDate, weeklyGoals, [], []);
    
    const archived = await mockStorageApi.get('archive-weekly-goals');
    const archivedGoals = JSON.parse(archived.value);
    
    if (archivedGoals.length === 2 && archivedGoals[0].completedDate === currentDate) {
      console.log('✅ Test 1: Archive weekly goals - PASSED');
      passed++;
    } else {
      console.log('❌ Test 1: Archive weekly goals - FAILED');
      console.log('   Expected 2 archived goals, got:', archivedGoals.length);
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 1: Archive weekly goals - FAILED');
    console.log('   Error:', error.message);
    failed++;
  }

  // Test 2: Archive gratitudes
  try {
    mockStorageApi.clear();
    const currentDate = '2025-12-15';
    const gratitude = ['I am grateful for my health', 'I am grateful for my family', 'I am grateful for opportunities'];
    
    await archiveData(currentDate, [], gratitude, []);
    
    const archived = await mockStorageApi.get('archive-gratitudes');
    const archivedGratitudes = JSON.parse(archived.value);
    
    if (archivedGratitudes.length === 3 && archivedGratitudes[0].date === currentDate) {
      console.log('✅ Test 2: Archive gratitudes - PASSED');
      passed++;
    } else {
      console.log('❌ Test 2: Archive gratitudes - FAILED');
      console.log('   Expected 3 gratitudes, got:', archivedGratitudes.length);
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 2: Archive gratitudes - FAILED');
    console.log('   Error:', error.message);
    failed++;
  }

  // Test 3: Archive daily tasks
  try {
    mockStorageApi.clear();
    const currentDate = '2025-12-15';
    const tasks = [
      { id: 1, text: 'Complete report', completed: true },
      { id: 2, text: 'Review email', completed: false },
      { id: 3, text: 'Meeting at 2 PM', completed: true }
    ];
    
    await archiveData(currentDate, [], [], tasks);
    
    const archived = await mockStorageApi.get(`archive-daily-tasks-${currentDate}`);
    const archivedTaskData = JSON.parse(archived.value);
    
    if (archivedTaskData.tasks.length === 3 && archivedTaskData.date === currentDate) {
      console.log('✅ Test 3: Archive daily tasks - PASSED');
      passed++;
    } else {
      console.log('❌ Test 3: Archive daily tasks - FAILED');
      console.log('   Expected 3 tasks, got:', archivedTaskData.tasks.length);
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 3: Archive daily tasks - FAILED');
    console.log('   Error:', error.message);
    failed++;
  }

  // Test 4: Get data within 3-month window
  try {
    mockStorageApi.clear();
    // Archive goals from various dates
    const today = new Date();
    const goal1Date = new Date(today);
    goal1Date.setDate(goal1Date.getDate() - 10);
    const goal1DateStr = goal1Date.toISOString().split('T')[0];
    
    const goal2Date = new Date(today);
    goal2Date.setMonth(goal2Date.getMonth() - 2);
    const goal2DateStr = goal2Date.toISOString().split('T')[0];
    
    const goal3Date = new Date(today);
    goal3Date.setMonth(goal3Date.getMonth() - 4);
    const goal3DateStr = goal3Date.toISOString().split('T')[0];
    
    await archiveData(goal1DateStr, 
      [{ id: 1, goal: 'Goal 1', category: 'Health', completed: true }], [], []);
    
    await archiveData(goal2DateStr, 
      [{ id: 2, goal: 'Goal 2', category: 'Career', completed: true }], [], []);
    
    await archiveData(goal3DateStr, 
      [{ id: 3, goal: 'Goal 3', category: 'Personal', completed: true }], [], []);
    
    const result = await getMonthsArchiveData(3);
    
    // Should include goals from last 3 months only
    const recentGoalIds = result.weeklyGoals.map(g => g.id);
    if (recentGoalIds.includes(1) && recentGoalIds.includes(2) && !recentGoalIds.includes(3)) {
      console.log('✅ Test 4: 3-month window filter - PASSED');
      passed++;
    } else {
      console.log('❌ Test 4: 3-month window filter - FAILED');
      console.log('   Expected goals 1,2 within window, got:', recentGoalIds);
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 4: 3-month window filter - FAILED');
    console.log('   Error:', error.message);
    failed++;
  }

  // Test 5: Purge data older than 3 months
  try {
    mockStorageApi.clear();
    // Archive goals from various dates
    const today = new Date();
    const oldDate = new Date(today);
    oldDate.setMonth(oldDate.getMonth() - 4);
    const oldDateStr = oldDate.toISOString().split('T')[0];
    
    const recentDate = new Date(today);
    recentDate.setDate(recentDate.getDate() - 10);
    const recentDateStr = recentDate.toISOString().split('T')[0];
    
    await archiveData(oldDateStr, 
      [{ id: 1, goal: 'Old Goal', category: 'Health', completed: true }], [], []);
    
    await archiveData(recentDateStr, 
      [{ id: 2, goal: 'Recent Goal', category: 'Career', completed: true }], [], []);
    
    // Purge old data
    await purgeOldData();
    
    const result = await getMonthsArchiveData(3);
    
    // Should only have recent goal
    const goalIds = result.weeklyGoals.map(g => g.id);
    if (goalIds.includes(2) && !goalIds.includes(1)) {
      console.log('✅ Test 5: Purge old data (>3 months) - PASSED');
      passed++;
    } else {
      console.log('❌ Test 5: Purge old data (>3 months) - FAILED');
      console.log('   Expected only goal 2, got:', goalIds);
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 5: Purge old data (>3 months) - FAILED');
    console.log('   Error:', error.message);
    failed++;
  }

  // Test 6: Rolling 3-month window maintains continuous history
  try {
    mockStorageApi.clear();
    // Archive data across 60 days
    const today = new Date();
    const archiveData2 = [];
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      await archiveData(dateStr, 
        [{ id: i, goal: `Goal ${i}`, category: 'Health', completed: true }], [], []);
    }
    
    const result = await getMonthsArchiveData(3);
    
    // Should have all 60 goals within 3-month window
    if (result.weeklyGoals.length === 60) {
      console.log('✅ Test 6: Rolling 3-month window - PASSED');
      passed++;
    } else {
      console.log('❌ Test 6: Rolling 3-month window - FAILED');
      console.log('   Expected 60 goals, got:', result.weeklyGoals.length);
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 6: Rolling 3-month window - FAILED');
    console.log('   Error:', error.message);
    failed++;
  }

  // Test 7: Mixed data archival (all types together)
  try {
    mockStorageApi.clear();
    const currentDate = '2025-12-15';
    const weeklyGoals = [
      { id: 1, goal: 'Run 5K', category: 'Health', completed: true },
      { id: 2, goal: 'Finish book', category: 'Personal', completed: true }
    ];
    const gratitude = ['Grateful for family', 'Grateful for health'];
    const tasks = [
      { id: 1, text: 'Task 1', completed: true },
      { id: 2, text: 'Task 2', completed: false }
    ];
    
    await archiveData(currentDate, weeklyGoals, gratitude, tasks);
    
    const weeklyResult = await mockStorageApi.get('archive-weekly-goals');
    const gratitudeResult = await mockStorageApi.get('archive-gratitudes');
    const taskResult = await mockStorageApi.get(`archive-daily-tasks-${currentDate}`);
    
    const hasWeekly = weeklyResult && JSON.parse(weeklyResult.value).length === 2;
    const hasGratitude = gratitudeResult && JSON.parse(gratitudeResult.value).length === 2;
    const hasTask = taskResult && JSON.parse(taskResult.value).tasks.length === 2;
    
    if (hasWeekly && hasGratitude && hasTask) {
      console.log('✅ Test 7: Mixed data archival - PASSED');
      passed++;
    } else {
      console.log('❌ Test 7: Mixed data archival - FAILED');
      console.log('   Weekly:', hasWeekly, 'Gratitude:', hasGratitude, 'Tasks:', hasTask);
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 7: Mixed data archival - FAILED');
    console.log('   Error:', error.message);
    failed++;
  }

  // Test 8: Category filtering in history
  try {
    mockStorageApi.clear();
    const currentDate = '2025-12-15';
    const weeklyGoals = [
      { id: 1, goal: 'Run 5K', category: 'Health', completed: true },
      { id: 2, goal: 'Save money', category: 'Finance', completed: true },
      { id: 3, goal: 'Read book', category: 'Personal', completed: true }
    ];
    
    await archiveData(currentDate, weeklyGoals, [], []);
    
    const result = await getMonthsArchiveData(3);
    const categories = [...new Set(result.weeklyGoals.map(g => g.category))];
    
    if (categories.includes('Health') && categories.includes('Finance') && categories.includes('Personal')) {
      console.log('✅ Test 8: Category filtering in history - PASSED');
      passed++;
    } else {
      console.log('❌ Test 8: Category filtering in history - FAILED');
      console.log('   Expected 3 categories, got:', categories);
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 8: Category filtering in history - FAILED');
    console.log('   Error:', error.message);
    failed++;
  }

  // Print results
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log(`║  RESULTS: ${passed} passed, ${failed} failed out of ${passed + failed} tests          ║`);
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  if (failed === 0) {
    console.log('🎉 All tests passed! Archival system is working correctly.\n');
  } else {
    console.log(`⚠️  ${failed} test(s) failed. Please review the implementation.\n`);
  }
}

// Run tests
runTests().catch(console.error);
