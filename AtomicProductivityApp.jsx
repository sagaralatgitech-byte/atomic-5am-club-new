import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Circle, TrendingUp, Award, Sun, Moon, Book, Heart, Target, Plus, Trash2, Edit2, Clock, Bell, Download, AlertCircle, Flame, Zap, Star, Coffee } from 'lucide-react';

// Storage adapter for localStorage
const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch (error) {
      console.error('Storage set error:', error);
      return null;
    }
  }
};

// Component to display completed weekly goals history
const WeeklyGoalsHistory = ({ getMonthsArchiveData }) => {
  const [historyData, setHistoryData] = useState({ weeklyGoals: [] });
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const data = await getMonthsArchiveData(3);
    setHistoryData(data);
    setLoading(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Health': 'bg-emerald-900/30 border-emerald-500/50 text-emerald-300',
      'Career': 'bg-blue-900/30 border-blue-500/50 text-blue-300',
      'Personal': 'bg-purple-900/30 border-purple-500/50 text-purple-300',
      'Relationships': 'bg-pink-900/30 border-pink-500/50 text-pink-300',
      'Finance': 'bg-amber-900/30 border-amber-500/50 text-amber-300'
    };
    return colors[category] || 'bg-slate-700/30 border-slate-500/50 text-slate-300';
  };

  const groupedGoals = {};
  historyData.weeklyGoals.forEach(goal => {
    if (!groupedGoals[goal.category]) {
      groupedGoals[goal.category] = [];
    }
    groupedGoals[goal.category].push(goal);
  });

  const categories = ['All', ...Object.keys(groupedGoals)];
  const displayGoals = selectedCategory === 'All' 
    ? historyData.weeklyGoals 
    : groupedGoals[selectedCategory] || [];

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
        <div className="text-center text-amber-200">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
      <h2 className="text-3xl font-black text-amber-400 mb-6 flex items-center gap-3">
        <TrendingUp className="text-amber-500" size={36} />
        Completed Goals History (Last 3 Months)
      </h2>

      {displayGoals.length === 0 ? (
        <div className="text-center py-8 text-amber-200/60">
          <p className="text-lg">No completed goals yet. Start setting and completing your weekly goals!</p>
        </div>
      ) : (
        <>
          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white scale-105'
                    : 'bg-slate-700/50 text-amber-200 hover:bg-slate-700'
                }`}
              >
                {cat} ({cat === 'All' ? displayGoals.length : (groupedGoals[cat] || []).length})
              </button>
            ))}
          </div>

          {/* Goals List */}
          <div className="space-y-3">
            {displayGoals.map((goal, idx) => (
              <div
                key={idx}
                className={`border-2 rounded-xl p-4 ${getCategoryColor(goal.category)}`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="fill-current mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-lg">{goal.goal}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="px-3 py-1 bg-black/30 rounded-full">{goal.category}</span>
                      <span className="opacity-75">{goal.completedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-slate-700/50 p-4 rounded-xl border border-amber-500/30 text-center">
              <p className="text-3xl font-black text-amber-400">{displayGoals.length}</p>
              <p className="text-sm text-amber-200/70 mt-1">Completed</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-xl border border-amber-500/30 text-center">
              <p className="text-3xl font-black text-emerald-400">{Object.keys(groupedGoals).length}</p>
              <p className="text-sm text-amber-200/70 mt-1">Categories</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-xl border border-amber-500/30 text-center">
              <p className="text-3xl font-black text-purple-400">{(displayGoals.length / Math.max(1, Object.values(groupedGoals).flat().length) * 100).toFixed(0)}%</p>
              <p className="text-sm text-amber-200/70 mt-1">Completion Rate</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AtomicProductivityApp = () => {
  const [activeTab, setActiveTab] = useState('morning');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Morning Routine State
  const [morningRoutine, setMorningRoutine] = useState({
    move: { completed: false, duration: 20, activity: '', time: '5:00 - 5:20 AM' },
    reflect: { completed: false, duration: 20, activity: '', time: '5:20 - 5:40 AM' },
    grow: { completed: false, duration: 20, activity: '', time: '5:40 - 6:00 AM' }
  });
  
  // Other States
  const [gratitude, setGratitude] = useState(['', '', '']);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Wake up at 5 AM', category: 'Morning', streak: 0, completed: false, twoMinuteVersion: 'Set alarm for 5 AM' },
    { id: 2, name: 'Read for 30 minutes', category: 'Growth', streak: 0, completed: false, twoMinuteVersion: 'Read 1 page' },
    { id: 3, name: 'Exercise', category: 'Health', streak: 0, completed: false, twoMinuteVersion: 'Put on workout clothes' }
  ]);
  
  const [weeklyGoals, setWeeklyGoals] = useState([
    { id: 1, goal: '', category: 'Health', completed: false },
    { id: 2, goal: '', category: 'Career', completed: false },
    { id: 3, goal: '', category: 'Personal', completed: false }
  ]);
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  
  const timeSlots = [
    '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', 
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
  ];
  
  const [timeBlocks, setTimeBlocks] = useState([
    { id: 1, time: '5:00 AM', activity: 'Victory Hour: 20/20/20 Formula', category: 'morning', completed: false, duration: 60 },
    { id: 2, time: '9:00 AM', activity: '90/90/1: Focus on #1 Priority Project', category: 'deep-work', completed: false, duration: 90 },
    { id: 3, time: '10:30 AM', activity: 'Work Block (60/10 Method)', category: 'work', completed: false, duration: 60 },
    { id: 4, time: '12:30 PM', activity: 'Lunch & Rest', category: 'break', completed: false, duration: 60 },
    { id: 5, time: '5:00 PM', activity: 'Second Wind Workout', category: 'exercise', completed: false, duration: 60 }
  ]);
  
  const [dailyFive, setDailyFive] = useState(['', '', '', '', '']);
  const [stats, setStats] = useState({
    totalDays: 0,
    perfectDays: 0,
    currentStreak: 0,
    longestStreak: 0
  });

  const [identity, setIdentity] = useState({
    statement: 'I am someone who takes care of my health and pursues growth daily',
    updated: false
  });

  const [habitStacks, setHabitStacks] = useState([
    { id: 1, trigger: 'After I wake up', newHabit: 'I will drink a glass of water', completed: false }
  ]);

  // Calculate if today is a perfect day
  const isPerfectDay = () => {
    const allHabitsCompleted = habits.every(h => h.completed);
    const morningRoutineComplete = 
      morningRoutine.move.completed && 
      morningRoutine.reflect.completed && 
      morningRoutine.grow.completed;
    return allHabitsCompleted && morningRoutineComplete;
  };

  // Update stats based on day completion
  const updateDayStats = async (completedDate) => {
    try {
      const completedDateData = await storage.get(`data-${completedDate}`);
      if (!completedDateData || !completedDateData.value) return;
      
      const dayData = JSON.parse(completedDateData.value);
      const dayHabits = dayData.habits || [];
      const dayMorningRoutine = dayData.morningRoutine || morningRoutine;
      
      const dayAllHabitsCompleted = dayHabits.every(h => h.completed);
      const dayMorningComplete = 
        dayMorningRoutine.move?.completed && 
        dayMorningRoutine.reflect?.completed && 
        dayMorningRoutine.grow?.completed;
      const wasPerfectDay = dayAllHabitsCompleted && dayMorningComplete;
      
      let newStats = { ...stats };
      
      // Increment total days
      newStats.totalDays = Math.max(stats.totalDays, dayHabits.length > 0 ? stats.totalDays + 1 : stats.totalDays);
      
      // Track perfect days
      if (wasPerfectDay && !stats.perfectDays) {
        newStats.perfectDays = (stats.perfectDays || 0) + 1;
      }
      
      // Calculate streak (simplified: if today is perfect, increment streak)
      if (isPerfectDay()) {
        newStats.currentStreak = (stats.currentStreak || 0) + 1;
        if (newStats.currentStreak > (stats.longestStreak || 0)) {
          newStats.longestStreak = newStats.currentStreak;
        }
      } else {
        // Reset streak if today is not perfect
        newStats.currentStreak = 0;
      }
      
      setStats(newStats);
      await storage.set('stats', JSON.stringify(newStats));
    } catch (error) {
      console.error('Error updating day stats:', error);
    }
  };

  // Handle date changes - save first, then load and update stats
  const handleDateChange = async (newDate) => {
    // Save current date's data first
    if (!loading) {
      // Update stats for the current date before switching
      await updateDayStats(currentDate);
      
      await storage.set(`data-${currentDate}`, JSON.stringify({
        morningRoutine,
        gratitude,
        habits,
        tasks,
        timeBlocks,
        dailyFive,
        date: currentDate,
        savedAt: new Date().toISOString()
      }));
    }
    // Then change to new date (which triggers loadData via useEffect)
    setCurrentDate(newDate);
  };

  // Load data on mount and date change
  useEffect(() => {
    loadData();
  }, [currentDate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const dateKey = `data-${currentDate}`;
      const result = await storage.get(dateKey);
      
      if (result && result.value) {
        const data = JSON.parse(result.value);
        setMorningRoutine(data.morningRoutine || morningRoutine);
        setGratitude(data.gratitude || ['', '', '']);
        setHabits(data.habits || habits);
        setTasks(data.tasks || []);
        setTimeBlocks(data.timeBlocks || timeBlocks);
        setDailyFive(data.dailyFive || ['', '', '', '', '']);
        setHabitStacks(data.habitStacks || habitStacks);
      }
      
      // Load persistent data
      const statsResult = await storage.get('stats');
      if (statsResult && statsResult.value) {
        setStats(JSON.parse(statsResult.value));
      }
      
      const weekResult = await storage.get('weekly-goals');
      if (weekResult && weekResult.value) {
        setWeeklyGoals(JSON.parse(weekResult.value));
      }

      const identityResult = await storage.get('identity');
      if (identityResult && identityResult.value) {
        setIdentity(JSON.parse(identityResult.value));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-save data
  useEffect(() => {
    if (!loading) {
      saveData();
    }
  }, [morningRoutine, gratitude, habits, tasks, stats, weeklyGoals, identity, habitStacks, timeBlocks, dailyFive]);

  // Update stats when habits or morning routine changes
  useEffect(() => {
    if (!loading) {
      updateStatsOnCompletion();
    }
  }, [morningRoutine, habits]);

  const saveData = async () => {
    try {
      const dateKey = `data-${currentDate}`;
      const data = {
        morningRoutine,
        gratitude,
        habits,
        tasks,
        timeBlocks,
        dailyFive,
        habitStacks,
        date: currentDate,
        savedAt: new Date().toISOString()
      };
      
      await storage.set(dateKey, JSON.stringify(data));
      await storage.set('stats', JSON.stringify(stats));
      await storage.set('weekly-goals', JSON.stringify(weeklyGoals));
      await storage.set('identity', JSON.stringify(identity));
      
      // Archive data and purge old records
      await archiveAndPurgeData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Archive completed weekly goals, daily tasks, and gratitudes
  const archiveData = async () => {
    try {
      const timestamp = new Date().toISOString();
      const dateStr = currentDate;

      // Archive completed weekly goals
      const completedGoals = weeklyGoals.filter(g => g.completed && g.goal);
      if (completedGoals.length > 0) {
        const archiveKey = `archive-weekly-goals`;
        const archiveResult = await storage.get(archiveKey);
        let archiveData = archiveResult && archiveResult.value ? JSON.parse(archiveResult.value) : [];
        
        completedGoals.forEach(goal => {
          archiveData.push({
            ...goal,
            completedDate: dateStr,
            archivedAt: timestamp
          });
        });
        
        await storage.set(archiveKey, JSON.stringify(archiveData));
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
        await storage.set(archiveKey, JSON.stringify(taskArchive));
      }

      // Archive gratitudes
      const validGratitudes = gratitude.filter(g => g && g.trim());
      if (validGratitudes.length > 0) {
        const archiveKey = `archive-gratitudes`;
        const archiveResult = await storage.get(archiveKey);
        let archiveData = archiveResult && archiveResult.value ? JSON.parse(archiveResult.value) : [];
        
        validGratitudes.forEach(g => {
          archiveData.push({
            text: g,
            date: dateStr,
            archivedAt: timestamp
          });
        });
        
        await storage.set(archiveKey, JSON.stringify(archiveData));
      }
    } catch (error) {
      console.error('Error archiving data:', error);
    }
  };

  // Get archives from past N months
  const getMonthsArchiveData = async (months = 3) => {
    try {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - months);
      const cutoffDate = threeMonthsAgo.toISOString().split('T')[0];

      // Get archived weekly goals
      const weeklyResult = await storage.get('archive-weekly-goals');
      const weeklyGoalsArchive = weeklyResult && weeklyResult.value ? JSON.parse(weeklyResult.value) : [];
      const recentWeeklyGoals = weeklyGoalsArchive.filter(g => g.completedDate >= cutoffDate);

      // Get archived gratitudes
      const gratitudeResult = await storage.get('archive-gratitudes');
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
        const taskResult = await storage.get(taskKey);
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

  // Purge data older than 3 months
  const purgeOldData = async () => {
    try {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      const cutoffDate = threeMonthsAgo.toISOString().split('T')[0];

      // Purge weekly goals archive
      const weeklyResult = await storage.get('archive-weekly-goals');
      if (weeklyResult && weeklyResult.value) {
        let archiveData = JSON.parse(weeklyResult.value);
        archiveData = archiveData.filter(g => g.completedDate >= cutoffDate);
        await storage.set('archive-weekly-goals', JSON.stringify(archiveData));
      }

      // Purge gratitudes archive
      const gratitudeResult = await storage.get('archive-gratitudes');
      if (gratitudeResult && gratitudeResult.value) {
        let archiveData = JSON.parse(gratitudeResult.value);
        archiveData = archiveData.filter(g => g.date >= cutoffDate);
        await storage.set('archive-gratitudes', JSON.stringify(archiveData));
      }

      // Purge old task archives
      const now = new Date();
      for (let i = 0; i < 365; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        if (dateStr < cutoffDate) {
          const taskKey = `archive-daily-tasks-${dateStr}`;
          try {
            // Remove old task archives
            const exists = await storage.get(taskKey);
            if (exists) {
              localStorage.removeItem(taskKey);
            }
          } catch (e) {
            // Continue if removal fails
          }
        }
      }
    } catch (error) {
      console.error('Error purging old data:', error);
    }
  };

  // Archive and purge data - called on each save
  const archiveAndPurgeData = async () => {
    try {
      // Archive current day's data
      await archiveData();
      
      // Purge data older than 3 months (run less frequently to avoid performance impact)
      const lastPurgeResult = await storage.get('last-purge-date');
      const lastPurge = lastPurgeResult ? lastPurgeResult.value : null;
      const today = new Date().toISOString().split('T')[0];
      
      // Only purge once per day
      if (lastPurge !== today) {
        await purgeOldData();
        await storage.set('last-purge-date', today);
      }
    } catch (error) {
      console.error('Error in archive and purge:', error);
    }
  };

  // Update stats in real-time when habits or morning routine completes
  const updateStatsOnCompletion = async () => {
    const perfect = isPerfectDay();
    
    setStats(prevStats => {
      const newStats = { ...prevStats };
      
      // Only update if today is now perfect
      if (perfect && prevStats.currentStreak === 0) {
        newStats.currentStreak = (prevStats.currentStreak || 0) + 1;
        newStats.perfectDays = (prevStats.perfectDays || 0) + 1;
        
        // Update longest streak
        if (newStats.currentStreak > (prevStats.longestStreak || 0)) {
          newStats.longestStreak = newStats.currentStreak;
        }
      }
      
      return newStats;
    });
  };

  // Helper functions
  const toggleMorningActivity = (activity) => {
    const wasCompleted = morningRoutine[activity].completed;
    setMorningRoutine(prev => ({
      ...prev,
      [activity]: { ...prev[activity], completed: !prev[activity].completed }
    }));
    
    // Show celebration when completing
    if (!wasCompleted && getMorningProgress() >= 67) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const updateMorningActivity = (activity, field, value) => {
    setMorningRoutine(prev => ({
      ...prev,
      [activity]: { ...prev[activity], [field]: value }
    }));
  };

  const updateGratitude = (index, value) => {
    const newGratitude = [...gratitude];
    newGratitude[index] = value;
    setGratitude(newGratitude);
  };

  const toggleHabit = (habitId) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completed;
        const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        return { ...habit, completed: newCompleted, streak: newStreak };
      }
      return habit;
    }));
  };

  const addHabit = () => {
    setHabits([...habits, {
      id: Date.now(),
      name: '',
      category: 'Personal',
      streak: 0,
      completed: false,
      twoMinuteVersion: ''
    }]);
  };

  const updateHabit = (habitId, field, value) => {
    setHabits(habits.map(habit => 
      habit.id === habitId ? { ...habit, [field]: value } : habit
    ));
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false, 
        priority: 'medium' 
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateWeeklyGoal = (goalId, field, value) => {
    setWeeklyGoals(weeklyGoals.map(goal => 
      goal.id === goalId ? { ...goal, [field]: value } : goal
    ));
  };

  const toggleWeeklyGoal = (goalId) => {
    setWeeklyGoals(weeklyGoals.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const addHabitStack = () => {
    setHabitStacks([...habitStacks, {
      id: Date.now(),
      trigger: '',
      newHabit: '',
      completed: false
    }]);
  };

  const updateHabitStack = (stackId, field, value) => {
    setHabitStacks(habitStacks.map(stack =>
      stack.id === stackId ? { ...stack, [field]: value } : stack
    ));
  };

  const toggleHabitStack = (stackId) => {
    setHabitStacks(habitStacks.map(stack =>
      stack.id === stackId ? { ...stack, completed: !stack.completed } : stack
    ));
  };

  const deleteHabitStack = (stackId) => {
    setHabitStacks(habitStacks.filter(stack => stack.id !== stackId));
  };

  const addTimeBlock = () => {
    setTimeBlocks([...timeBlocks, {
      id: Date.now(),
      time: '',
      activity: '',
      category: 'work',
      completed: false,
      duration: 60
    }]);
  };

  const updateTimeBlock = (blockId, field, value) => {
    setTimeBlocks(timeBlocks.map(block =>
      block.id === blockId ? { ...block, [field]: value } : block
    ));
  };

  const toggleTimeBlock = (blockId) => {
    setTimeBlocks(timeBlocks.map(block =>
      block.id === blockId ? { ...block, completed: !block.completed } : block
    ));
  };

  const deleteTimeBlock = (blockId) => {
    setTimeBlocks(timeBlocks.filter(block => block.id !== blockId));
  };

  const updateDailyFive = (index, value) => {
    const newDailyFive = [...dailyFive];
    newDailyFive[index] = value;
    setDailyFive(newDailyFive);
  };

  const getMorningProgress = () => {
    const completed = Object.values(morningRoutine).filter(a => a.completed).length;
    return (completed / 3) * 100;
  };

  const getHabitCompletionRate = () => {
    if (habits.length === 0) return 0;
    const completed = habits.filter(h => h.completed).length;
    return Math.round((completed / habits.length) * 100);
  };

  const getHabitStackingCompletionRate = () => {
    if (habitStacks.length === 0) return 0;
    const completed = habitStacks.filter(s => s.completed).length;
    return Math.round((completed / habitStacks.length) * 100);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'morning': 'bg-gradient-to-br from-amber-100 to-orange-100 border-orange-300 text-orange-900',
      'deep-work': 'bg-gradient-to-br from-violet-100 to-purple-100 border-purple-300 text-purple-900',
      'work': 'bg-gradient-to-br from-sky-100 to-blue-100 border-blue-300 text-blue-900',
      'break': 'bg-gradient-to-br from-emerald-100 to-green-100 border-green-300 text-green-900',
      'exercise': 'bg-gradient-to-br from-rose-100 to-pink-100 border-pink-300 text-pink-900',
      'learning': 'bg-gradient-to-br from-indigo-100 to-blue-100 border-indigo-300 text-indigo-900',
      'personal': 'bg-gradient-to-br from-fuchsia-100 to-pink-100 border-fuchsia-300 text-fuchsia-900'
    };
    return colors[category] || 'bg-gradient-to-br from-gray-100 to-slate-100 border-gray-300 text-gray-900';
  };

  // Initialize Google Calendar API
  const initializeGoogleCalendar = async () => {
    return new Promise((resolve) => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/calendar',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
        }).then(() => {
          resolve(true);
        }).catch((error) => {
          console.error('Google Calendar initialization failed:', error);
          resolve(false);
        });
      });
    });
  };

  // Generate ICS format event string
  const generateICSEvent = (summary, description, startDateTime, endDateTime, reminders = []) => {
    // Format datetime for ICS (YYYYMMDDTHHmmssZ)
    const formatICSDateTime = (dateStr, timeStr) => {
      const date = new Date(dateStr);
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      date.setHours(hours, minutes, 0);
      
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const h = String(date.getUTCHours()).padStart(2, '0');
      const m = String(date.getUTCMinutes()).padStart(2, '0');
      const s = String(date.getUTCSeconds()).padStart(2, '0');
      
      return `${year}${month}${day}T${h}${m}${s}Z`;
    };

    const dtstart = formatICSDateTime(startDateTime.date, startDateTime.time);
    const dtend = formatICSDateTime(endDateTime.date, endDateTime.time);
    
    // Create UID based on summary and time
    const uid = `atomic-${summary.replace(/\s+/g, '-').toLowerCase()}-${dtstart}@atomicclub`;
    
    // Escape special characters in description
    const escapedDescription = description.replace(/\n/g, '\\n').replace(/"/g, '\\"');
    const escapedSummary = summary.replace(/"/g, '\\"');

    let event = `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${escapedSummary}
DESCRIPTION:${escapedDescription}`;

    // Add reminders/alarms
    if (reminders.length > 0) {
      reminders.forEach(reminder => {
        event += `
BEGIN:VALARM
TRIGGER:-PT${reminder}M
ACTION:DISPLAY
DESCRIPTION:${escapedSummary}
END:VALARM`;
      });
    }

    event += `
END:VEVENT`;
    
    return event;
  };

  // Export schedule to ICS file
  const exportToICS = () => {
    try {
      if (timeBlocks.length === 0) {
        alert('⚠️ No time blocks added yet. Please add activities first!');
        return;
      }

      const events = [];
      
      // Add Victory Hour event
      if (morningRoutine.move.activity || morningRoutine.reflect.activity || morningRoutine.grow.activity) {
        const victoryDescription = `MOVE (5:00-5:20 AM): ${morningRoutine.move.activity || 'Not specified'}\nREFLECT (5:20-5:40 AM): ${morningRoutine.reflect.activity || 'Not specified'}\nGROW (5:40-6:00 AM): ${morningRoutine.grow.activity || 'Not specified'}`;
        
        events.push(generateICSEvent(
          '🌅 Victory Hour - 20/20/20 Formula',
          victoryDescription,
          { date: currentDate, time: '5:00 AM' },
          { date: currentDate, time: '6:00 AM' },
          [15] // 15 minute reminder
        ));
      }

      // Add time block events
      for (const block of timeBlocks) {
        if (block.activity && block.time) {
          const startTime = block.time;
          
          // Calculate end time
          let [hours, minutes] = startTime.split(':').map(s => s.trim());
          minutes = minutes.split(' ')[0];
          let period = startTime.split(' ')[1];
          
          let startHours = parseInt(hours);
          let startMinutes = parseInt(minutes);
          
          if (period === 'PM' && startHours !== 12) startHours += 12;
          if (period === 'AM' && startHours === 12) startHours = 0;
          
          let endHours = startHours + Math.floor(block.duration / 60);
          let endMinutes = startMinutes + (block.duration % 60);
          
          if (endMinutes >= 60) {
            endHours += 1;
            endMinutes -= 60;
          }
          
          // Handle day overflow
          let endDate = currentDate;
          if (endHours >= 24) {
            const nextDate = new Date(currentDate);
            nextDate.setDate(nextDate.getDate() + 1);
            endDate = nextDate.toISOString().split('T')[0];
            endHours -= 24;
          }
          
          const endPeriod = endHours >= 12 ? 'PM' : 'AM';
          const displayHours = endHours % 12 || 12;
          const endTime = `${displayHours}:${String(endMinutes).padStart(2, '0')} ${endPeriod}`;

          const categoryEmojis = {
            'morning': '🌅',
            'deep-work': '🎯',
            'work': '💼',
            'break': '🌿',
            'exercise': '💪',
            'learning': '📚',
            'personal': '❤️'
          };

          const eventSummary = `${categoryEmojis[block.category] || '📌'} ${block.activity}`;
          const eventDescription = `Category: ${block.category.toUpperCase()}\nDuration: ${block.duration} minutes`;

          events.push(generateICSEvent(
            eventSummary,
            eventDescription,
            { date: currentDate, time: startTime },
            { date: endDate, time: endTime },
            [10] // 10 minute reminder
          ));
        }
      }

      if (events.length === 0) {
        alert('⚠️ No events to export. Please add time blocks first.');
        return;
      }

      // Build ICS file content
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Atomic 5 AM Club//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Atomic 5 AM Club - ${currentDate}
X-WR-CALDESC:Daily schedule for Atomic 5 AM Club
X-WR-TIMEZONE:UTC
${events.join('\n')}
END:VCALENDAR`;

      // Create blob and download
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `atomic-schedule-${currentDate}.ics`;
      link.click();
      URL.revokeObjectURL(link.href);

      alert(`✅ Schedule exported! Downloaded: atomic-schedule-${currentDate}.ics\n\nNext steps:\n1. Open the downloaded file\n2. Import into Google Calendar, Outlook, Apple Calendar, or any calendar app\n3. You'll get notifications for all events!`);
    } catch (error) {
      console.error('Error exporting to ICS:', error);
      alert(`❌ Error exporting schedule: ${error.message}`);
    }
  };

  // Sync time blocks to Google Calendar (Legacy - kept for reference)
  const syncToGoogleCalendar = async () => {
    try {
      const isInitialized = await initializeGoogleCalendar();
      if (!isInitialized) {
        alert('❌ Unable to initialize Google Calendar. Please check your API credentials.');
        return;
      }

      const auth2 = window.gapi.auth2.getAuthInstance();
      if (!auth2 || !auth2.isSignedIn.get()) {
        // Sign in if not already signed in
        await auth2.signIn();
      }

      let eventsCreated = 0;
      let eventsFailed = 0;

      // Create Victory Hour event
      if (morningRoutine.move.activity || morningRoutine.reflect.activity || morningRoutine.grow.activity) {
        const victoryHourEvent = {
          summary: '🌅 Victory Hour - 20/20/20 Formula',
          description: `MOVE (5:00-5:20 AM): ${morningRoutine.move.activity || 'Not specified'}\nREFLECT (5:20-5:40 AM): ${morningRoutine.reflect.activity || 'Not specified'}\nGROW (5:40-6:00 AM): ${morningRoutine.grow.activity || 'Not specified'}`,
          start: {
            dateTime: `${currentDate}T05:00:00`,
            timeZone: 'UTC'
          },
          end: {
            dateTime: `${currentDate}T06:00:00`,
            timeZone: 'UTC'
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'notification', minutes: 15 }
            ]
          }
        };

        try {
          await window.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: victoryHourEvent
          });
          eventsCreated++;
        } catch (error) {
          console.error('Failed to create Victory Hour event:', error);
          eventsFailed++;
        }
      }

      // Create time block events
      for (const block of timeBlocks) {
        if (block.activity && block.time) {
          const timeMatch = block.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
          if (timeMatch) {
            let [, hours, minutes, period] = timeMatch;
            hours = parseInt(hours);

            if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
            if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

            const startTime = `${currentDate}T${hours.toString().padStart(2, '0')}:${minutes}:00`;
            const endHour = hours + Math.floor(block.duration / 60);
            const endMinutes = (parseInt(minutes) + (block.duration % 60)) % 60;
            const endTime = `${currentDate}T${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}:00`;

            const categoryEmojis = {
              'morning': '🌅',
              'deep-work': '🎯',
              'work': '💼',
              'break': '🌿',
              'exercise': '💪',
              'learning': '📚',
              'personal': '❤️'
            };

            const timeBlockEvent = {
              summary: `${categoryEmojis[block.category] || '📌'} ${block.activity}`,
              description: `Category: ${block.category.toUpperCase()}\nDuration: ${block.duration} minutes`,
              start: {
                dateTime: startTime,
                timeZone: 'UTC'
              },
              end: {
                dateTime: endTime,
                timeZone: 'UTC'
              },
              reminders: {
                useDefault: false,
                overrides: [
                  { method: 'notification', minutes: 10 }
                ]
              }
            };

            try {
              await window.gapi.client.calendar.events.insert({
                calendarId: 'primary',
                resource: timeBlockEvent
              });
              eventsCreated++;
            } catch (error) {
              console.error(`Failed to create event for ${block.activity}:`, error);
              eventsFailed++;
            }
          }
        }
      }

      // Show result
      if (eventsCreated > 0) {
        alert(`✅ Calendar synced! ${eventsCreated} event(s) created.\n${eventsFailed > 0 ? `⚠️ ${eventsFailed} event(s) failed to create.` : ''}`);
      } else {
        alert('⚠️ No events created. Please add time blocks and activities first.');
      }
    } catch (error) {
      console.error('Error syncing to Google Calendar:', error);
      alert(`❌ Error syncing to Google Calendar: ${error.message}`);
    }
  };

  const exportToGoogleCalendar = () => {
    exportToICS();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin"></div>
            <Sun className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={48} />
          </div>
          <p className="text-indigo-200 text-xl font-semibold">Loading your productivity dashboard...</p>
          <p className="text-indigo-300/60 text-sm mt-2">Preparing your journey to success</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4 sm:p-8">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-5 rounded-full shadow-2xl text-2xl font-bold">
            🎉 Victory Hour Complete! 🎉
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 mb-8 border border-indigo-500/20 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Atomic 5 AM Club
              </h1>
              <p className="text-indigo-200/70 mt-3 font-medium text-lg">Master your morning, elevate your life</p>
            </div>
            <div className="text-right">
              <input 
                type="date" 
                value={currentDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="px-6 py-4 bg-slate-700/50 text-indigo-100 border-2 border-indigo-500/40 rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-slate-700 transition-all font-semibold text-lg hover:bg-slate-700/70"
              />
              <p className="text-sm text-indigo-300/70 mt-3 font-medium">Day {stats.totalDays} of your journey</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-indigo-600/30 to-indigo-700/30 p-5 rounded-2xl shadow-lg hover:shadow-xl hover:from-indigo-600/40 hover:to-indigo-700/40 transition-all border border-indigo-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="text-indigo-300" size={22} />
                <span className="text-sm text-indigo-200 font-semibold">Streak</span>
              </div>
              <p className="text-4xl font-black text-indigo-100">{stats.currentStreak}</p>
              <p className="text-xs text-indigo-300/70 mt-1">days</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-600/30 to-green-700/30 p-5 rounded-2xl shadow-lg hover:shadow-xl hover:from-emerald-600/40 hover:to-green-700/40 transition-all border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Star className="text-emerald-300" size={22} />
                <span className="text-sm text-emerald-200 font-semibold">Perfect Days</span>
              </div>
              <p className="text-4xl font-black text-emerald-100">{stats.perfectDays}</p>
              <p className="text-xs text-emerald-300/70 mt-1">completed</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-600/30 to-orange-700/30 p-5 rounded-2xl shadow-lg hover:shadow-xl hover:from-amber-600/40 hover:to-orange-700/40 transition-all border border-amber-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Coffee className="text-amber-300" size={22} />
                <span className="text-sm text-amber-200 font-semibold">Morning</span>
              </div>
              <p className="text-4xl font-black text-amber-100">{Math.round(getMorningProgress())}%</p>
              <p className="text-xs text-amber-300/70 mt-1">complete</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/30 to-pink-700/30 p-5 rounded-2xl shadow-lg hover:shadow-xl hover:from-purple-600/40 hover:to-pink-700/40 transition-all border border-purple-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="text-purple-300" size={22} />
                <span className="text-sm text-purple-200 font-semibold">Habits</span>
              </div>
              <p className="text-4xl font-black text-purple-100">{getHabitCompletionRate()}%</p>
              <p className="text-xs text-purple-300/70 mt-1">done</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-xl mb-8 p-3 border border-indigo-500/20 backdrop-blur-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'morning', icon: Sun, label: 'Morning' },
              { id: 'schedule', icon: Clock, label: 'Schedule' },
              { id: 'habits', icon: Target, label: 'Habits' },
              { id: 'identity', icon: Star, label: 'Identity' },
              { id: 'stacking', icon: Zap, label: 'Stacking' },
              { id: 'tasks', icon: CheckCircle, label: 'Tasks' },
              { id: 'weekly', icon: Calendar, label: 'Weekly' },
              { id: 'gratitude', icon: Heart, label: 'Gratitude' }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-indigo-200/70 hover:bg-slate-700/50 hover:text-indigo-200 hover:shadow-md'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Morning Tab */}
        {activeTab === 'morning' && (
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 border border-indigo-500/20 backdrop-blur-sm">
            <h2 className="text-4xl font-black text-indigo-300 mb-3 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-600/30 to-orange-600/30 rounded-xl border border-amber-500/30">
                <Sun className="text-amber-400" size={32} />
              </div>
              Victory Hour: 20/20/20 Formula
            </h2>
            <p className="text-indigo-200/70 mb-8 text-lg font-medium">Master your morning in three 20-minute periods. Build the foundation for your entire day.</p>
            
            <div className="space-y-6">
              {/* Move */}
              <div className="border-2 border-amber-500/40 rounded-2xl p-6 bg-gradient-to-br from-amber-900/20 to-slate-800/40 hover:shadow-xl hover:border-amber-500/60 transition-all hover:bg-gradient-to-br hover:from-amber-900/30 hover:to-slate-800/50">
                <div className="flex items-center gap-4 mb-5">
                  <button
                    onClick={() => toggleMorningActivity('move')}
                    className={`transition-all duration-300 ${morningRoutine.move.completed ? 'text-amber-400 scale-110' : 'text-amber-500/70 hover:text-amber-400'}`}
                  >
                    {morningRoutine.move.completed ? 
                      <CheckCircle size={44} className="fill-current" /> : 
                      <Circle size={44} />
                    }
                  </button>
                  <div>
                    <h3 className="text-2xl font-bold text-amber-300">5:00 - 5:20 AM: MOVE</h3>
                    <p className="text-sm text-amber-200/60">Vigorous exercise to boost BDNF, dopamine & serotonin</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="What exercise did you do? (e.g., jogging, yoga, HIIT)"
                  value={morningRoutine.move.activity}
                  onChange={(e) => updateMorningActivity('move', 'activity', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:border-amber-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40"
                />
              </div>

              {/* Reflect */}
              <div className="border-2 border-purple-500/40 rounded-2xl p-6 bg-gradient-to-br from-purple-900/20 to-slate-800/40 hover:shadow-xl hover:border-purple-500/60 transition-all hover:bg-gradient-to-br hover:from-purple-900/30 hover:to-slate-800/50">
                <div className="flex items-center gap-4 mb-5">
                  <button
                    onClick={() => toggleMorningActivity('reflect')}
                    className={`transition-all duration-300 ${morningRoutine.reflect.completed ? 'text-purple-400 scale-110' : 'text-purple-500/70 hover:text-purple-400'}`}
                  >
                    {morningRoutine.reflect.completed ? 
                      <CheckCircle size={44} className="fill-current" /> : 
                      <Circle size={44} />
                    }
                  </button>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-300">5:20 - 5:40 AM: REFLECT</h3>
                    <p className="text-sm text-purple-200/60">Meditation, journaling, visualization, prayer</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="What reflection practice? (e.g., meditation, journaling, prayer)"
                  value={morningRoutine.reflect.activity}
                  onChange={(e) => updateMorningActivity('reflect', 'activity', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40 mb-4"
                />
                
                <div className="p-5 bg-gradient-to-br from-purple-900/20 to-slate-800/30 rounded-2xl border-2 border-purple-500/30 hover:border-purple-500/50 transition-all">
                  <h4 className="font-bold text-purple-300 mb-4 flex items-center gap-3 text-lg">
                    <div className="p-2 bg-purple-600/30 rounded-lg">
                      <Target size={20} className="text-purple-400" />
                    </div>
                    Daily Five: Your 5 Major Targets
                  </h4>
                  <div className="space-y-3">
                    {dailyFive.map((item, index) => (
                      <input
                        key={index}
                        type="text"
                        placeholder={`🎯 Target ${index + 1}: What's one key outcome?`}
                        value={item}
                        onChange={(e) => updateDailyFive(index, e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/40 text-indigo-100 border border-purple-500/20 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-slate-700/60 transition-all hover:bg-slate-700/50 placeholder-indigo-300/40 text-sm font-medium"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Grow */}
              <div className="border-2 border-emerald-500/40 rounded-2xl p-6 bg-gradient-to-br from-emerald-900/20 to-slate-800/40 hover:shadow-xl hover:border-emerald-500/60 transition-all hover:bg-gradient-to-br hover:from-emerald-900/30 hover:to-slate-800/50">
                <div className="flex items-center gap-4 mb-5">
                  <button
                    onClick={() => toggleMorningActivity('grow')}
                    className={`transition-all duration-300 ${morningRoutine.grow.completed ? 'text-emerald-400 scale-110' : 'text-emerald-500/70 hover:text-emerald-400'}`}
                  >
                    {morningRoutine.grow.completed ? 
                      <CheckCircle size={44} className="fill-current" /> : 
                      <Circle size={44} />
                    }
                  </button>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-300">5:40 - 6:00 AM: GROW</h3>
                    <p className="text-sm text-emerald-200/60">Reading, learning, skill development</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="What did you learn? (e.g., read 20 pages, online course, podcast)"
                  value={morningRoutine.grow.activity}
                  onChange={(e) => updateMorningActivity('grow', 'activity', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-emerald-500/30 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-2xl border-2 border-amber-500/40 hover:border-amber-500/60 transition-all">
              <p className="text-indigo-100 flex items-start gap-4 text-lg">
                <span className="text-3xl flex-shrink-0 mt-1">💡</span>
                <span><strong className="text-amber-300 block mb-2">Victory Hour Wisdom:</strong> It takes 66 days to reach automaticity. Stay consistent, and never miss twice! Your morning sets the tone for your entire day.</span>
              </p>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 border border-indigo-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-4xl font-black text-indigo-300 flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl border border-purple-500/30">
                    <Clock className="text-purple-400" size={32} />
                  </div>
                  Daily Time Blocking
                </h2>
                <p className="text-indigo-200/70 text-lg font-medium">Plan your day from 5 AM to 11 PM with focused time blocks</p>
              </div>
              <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                <button
                  onClick={addTimeBlock}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg border border-indigo-500/50 hover:border-indigo-400"
                >
                  <Plus size={20} />
                  Add Block
                </button>
                <button
                  onClick={exportToGoogleCalendar}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg border border-purple-500/50 hover:border-purple-400"
                >
                  <Download size={20} />
                  Export to ICS
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-900/25 to-indigo-900/25 rounded-2xl border-2 border-blue-500/40 hover:border-blue-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-600/30 rounded-lg flex-shrink-0">
                  <Bell className="text-blue-400" size={24} />
                </div>
                <div className="text-sm text-indigo-100">
                  <p className="font-bold mb-3 text-lg text-blue-300">� Export & Import to Your Calendar:</p>
                  <ol className="list-decimal ml-5 space-y-2 text-indigo-200/80">
                    <li>Fill in your time blocks below</li>
                    <li>Click "Export to ICS" to download the calendar file</li>
                    <li>Open the downloaded .ics file or import it into your calendar app</li>
                    <li>Works with Google Calendar, Outlook, Apple Calendar, or any calendar app!</li>
                    <li>Enable notifications in your calendar - get alerts 10-15 minutes before each event!</li>
                  </ol>
                  <p className="text-xs text-blue-300/80 mt-3 italic">💡 The ICS format is universal - compatible with any calendar service you use!</p>
                </div>
              </div>
            </div>

            {/* Time Blocks */}
            <div className="space-y-4">
              {timeBlocks.sort((a, b) => {
                const timeA = a.time.toLowerCase().includes('pm') && !a.time.startsWith('12') 
                  ? parseInt(a.time) + 12 : parseInt(a.time);
                const timeB = b.time.toLowerCase().includes('pm') && !b.time.startsWith('12')
                  ? parseInt(b.time) + 12 : parseInt(b.time);
                return timeA - timeB;
              }).map(block => (
                <div key={block.id} className={`border-2 rounded-2xl p-6 transition-all hover:shadow-xl ${getCategoryColor(block.category)}`}>
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTimeBlock(block.id)}
                      className={`mt-1 transition-all duration-300 flex-shrink-0 ${block.completed ? 'text-emerald-400 scale-110' : 'text-indigo-400 hover:text-indigo-300'}`}
                    >
                      {block.completed ? <CheckCircle size={40} className="fill-current" /> : <Circle size={40} />}
                    </button>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <select
                          value={block.time}
                          onChange={(e) => updateTimeBlock(block.id, 'time', e.target.value)}
                          className="px-4 py-3 border-2 border-indigo-500/40 rounded-xl focus:outline-none focus:border-indigo-400 bg-slate-700/60 text-indigo-100 font-semibold hover:bg-slate-700/80 transition-all"
                        >
                          <option value="">Select Time</option>
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={block.duration}
                            onChange={(e) => updateTimeBlock(block.id, 'duration', parseInt(e.target.value))}
                            placeholder="Duration"
                            className="w-28 px-4 py-3 border-2 border-indigo-500/40 rounded-xl focus:outline-none focus:border-indigo-400 bg-slate-700/60 text-indigo-100 font-semibold hover:bg-slate-700/80 transition-all"
                            min="5"
                            step="5"
                          />
                          <span className="text-sm font-semibold text-indigo-200">min</span>
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="What will you do during this block?"
                        value={block.activity}
                        onChange={(e) => updateTimeBlock(block.id, 'activity', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-indigo-500/40 rounded-xl focus:outline-none focus:border-indigo-400 bg-slate-700/60 text-indigo-100 font-medium hover:bg-slate-700/80 transition-all placeholder-indigo-300/40"
                      />

                      <select
                        value={block.category}
                        onChange={(e) => updateTimeBlock(block.id, 'category', e.target.value)}
                        className="px-4 py-3 border-2 border-indigo-500/40 rounded-xl focus:outline-none focus:border-indigo-400 text-sm bg-slate-700/60 text-indigo-100 font-semibold hover:bg-slate-700/80 transition-all"
                      >
                        <option value="morning">🌅 Morning Routine</option>
                        <option value="deep-work">🎯 Deep Work (90/90/1)</option>
                        <option value="work">💼 Work Block (60/10)</option>
                        <option value="break">🌿 Break / Rest</option>
                        <option value="exercise">💪 Exercise / Workout</option>
                        <option value="learning">📚 Learning / Growth</option>
                        <option value="personal">❤️ Personal / Family Time</option>
                      </select>
                    </div>

                    <button
                      onClick={() => deleteTimeBlock(block.id)}
                      className="text-red-500/70 hover:text-red-400 hover:scale-110 transition-all mt-1 flex-shrink-0"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {timeBlocks.length === 0 && (
              <div className="text-center py-16">
                <div className="p-4 bg-indigo-900/20 rounded-full inline-block mb-4">
                  <Clock size={64} className="text-indigo-400 opacity-70" />
                </div>
                <p className="text-2xl font-bold text-indigo-300 mb-2">No time blocks yet</p>
                <p className="text-indigo-200/70 text-lg">Click "Add Block" to start planning your day!</p>
              </div>
            )}
          </div>
        )}

        {/* Habits Tab */}
        {activeTab === 'habits' && (
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 border border-indigo-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-4xl font-black text-indigo-300 flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gradient-to-br from-emerald-600/30 to-teal-600/30 rounded-xl border border-emerald-500/30">
                    <Target className="text-emerald-400" size={32} />
                  </div>
                  Atomic Habits Tracker
                </h2>
              </div>
              <button
                onClick={addHabit}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg border border-emerald-500/50 hover:border-emerald-400"
              >
                <Plus size={20} />
                Add Habit
              </button>
            </div>

            <div className="space-y-4">
              {habits.map(habit => (
                <div key={habit.id} className="border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-900/15 to-slate-800/40 rounded-2xl p-6 hover:border-emerald-500/60 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`transition-all duration-300 flex-shrink-0 ${habit.completed ? 'text-emerald-400 scale-110' : 'text-emerald-500/70 hover:text-emerald-400'}`}
                    >
                      {habit.completed ? <CheckCircle size={40} className="fill-current" /> : <Circle size={40} />}
                    </button>
                    
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        placeholder="Habit name (e.g., Exercise for 30 minutes)"
                        value={habit.name}
                        onChange={(e) => updateHabit(habit.id, 'name', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-emerald-500/30 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40 font-medium"
                      />
                      <input
                        type="text"
                        placeholder="Two-minute version (e.g., Put on workout clothes)"
                        value={habit.twoMinuteVersion}
                        onChange={(e) => updateHabit(habit.id, 'twoMinuteVersion', e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700/50 text-indigo-100 border-2 border-emerald-500/30 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40 text-sm"
                      />
                      <select
                        value={habit.category}
                        onChange={(e) => updateHabit(habit.id, 'category', e.target.value)}
                        className="px-4 py-2 bg-slate-700/50 text-indigo-100 border-2 border-emerald-500/30 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 text-sm font-semibold"
                      >
                        <option>Morning</option>
                        <option>Health</option>
                        <option>Growth</option>
                        <option>Personal</option>
                        <option>Work</option>
                      </select>
                    </div>

                    <div className="text-center bg-gradient-to-br from-amber-500/80 to-orange-600/80 rounded-2xl p-4 min-w-[100px] border border-amber-500/40 hover:border-amber-500/60 transition-all hover:shadow-lg">
                      <div className="flex items-center justify-center gap-2">
                        <Flame className="text-amber-100" size={22} />
                        <div className="text-3xl font-black text-amber-50">{habit.streak}</div>
                      </div>
                      <div className="text-xs text-amber-100/90 font-bold">day streak</div>
                    </div>

                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-500/70 hover:text-red-400 hover:scale-110 transition-all flex-shrink-0"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {habits.length === 0 && (
              <div className="text-center py-16 text-amber-400/50">
                <Target size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">No habits yet</p>
                <p className="text-sm mt-2">Click "Add Habit" to start building!</p>
              </div>
            )}

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-2xl border-2 border-purple-500/30">
              <p className="text-purple-100 font-bold mb-3">🎯 Four Laws of Behavior Change:</p>
              <ul className="text-sm text-purple-200/80 space-y-2 ml-4">
                <li>• Make it Obvious - Design your environment for success</li>
                <li>• Make it Attractive - Pair habits with things you enjoy</li>
                <li>• Make it Easy - Use the Two-Minute Rule to start small</li>
                <li>• Make it Satisfying - Track progress and celebrate wins</li>
              </ul>
            </div>
          </div>
        )}

        {/* Identity Tab */}
        {activeTab === 'identity' && (
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 border border-indigo-500/20 backdrop-blur-sm">
            <h2 className="text-4xl font-black text-indigo-300 mb-3 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl border border-purple-500/30">
                <Star className="text-purple-400" size={32} />
              </div>
              Identity-Based Habits
            </h2>
            <p className="text-indigo-200/70 mb-8 text-lg font-medium">
              Focus not on what you want to achieve, but on who you wish to become. Every action is a vote for your new identity.
            </p>

            <div className="bg-gradient-to-br from-purple-900/25 to-pink-900/25 rounded-2xl p-6 border-2 border-purple-500/40 mb-8 hover:border-purple-500/60 transition-all">
              <label className="block text-xl font-bold text-purple-300 mb-4">
                Who do you want to become?
              </label>
              <textarea
                value={identity.statement}
                onChange={(e) => setIdentity({ statement: e.target.value, updated: true })}
                placeholder="I am someone who..."
                className="w-full px-4 py-4 bg-slate-700/50 text-indigo-100 border-2 border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 resize-none font-medium placeholder-indigo-300/40"
                rows="4"
              />
              <p className="text-sm text-indigo-200/70 mt-4 leading-relaxed">
                📝 <strong className="text-purple-300">Examples:</strong> "I am someone who never misses workouts" • "I am a writer who publishes every day" • "I am an early riser who owns my mornings"
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-purple-300">How your habits support your identity:</h3>
              
              {habits.map(habit => (
                <div key={habit.id} className="bg-gradient-to-r from-purple-900/15 to-slate-800/40 border-2 border-purple-500/40 rounded-2xl p-6 hover:border-purple-500/60 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    {habit.completed ? (
                      <CheckCircle className="text-emerald-400 flex-shrink-0 fill-current" size={36} />
                    ) : (
                      <Circle className="text-purple-400/50 flex-shrink-0" size={36} />
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-indigo-100 text-lg">{habit.name || 'Unnamed habit'}</p>
                      <p className="text-sm text-indigo-200/60 mt-1">
                        ✓ Every completion is a vote for your new identity
                      </p>
                    </div>
                    <div className="text-center bg-gradient-to-br from-purple-600/80 to-pink-600/80 rounded-2xl p-4 min-w-[100px] border border-purple-500/40 hover:border-purple-500/60 transition-all hover:shadow-lg">
                      <div className="text-3xl font-black text-purple-50">{habit.streak}</div>
                      <div className="text-xs text-purple-100/90 font-bold">votes cast</div>
                    </div>
                  </div>
                </div>
              ))}

              {habits.length === 0 && (
                <div className="text-center py-12 text-indigo-400/50">
                  <p className="text-lg">Add habits in the Habits tab to track your identity votes</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border-2 border-purple-500/40 hover:border-purple-500/60 transition-all">
              <p className="text-indigo-100 leading-relaxed">
                <strong className="text-purple-300 text-lg">💡 Key Insight:</strong> Your habits embody your identity. Small wins are evidence of your new self. 
                The goal isn't to run a marathon; it's to become a runner. The goal isn't to write a book; it's to become a writer.
              </p>
            </div>
          </div>
        )}

        {/* Habit Stacking Tab */}
        {activeTab === 'stacking' && (
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 border border-indigo-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-4xl font-black text-indigo-300 flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gradient-to-br from-yellow-600/30 to-orange-600/30 rounded-xl border border-yellow-500/30">
                    <Zap className="text-yellow-400" size={32} />
                  </div>
                  Habit Stacking
                </h2>
                <p className="text-indigo-200/70 text-lg font-medium">Link new habits to existing ones for automatic success</p>
              </div>
              <button
                onClick={addHabitStack}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold text-lg border border-yellow-500/50 hover:border-yellow-400"
              >
                <Plus size={20} />
                Add Stack
              </button>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-yellow-900/25 to-orange-900/25 rounded-2xl border-2 border-yellow-500/40 hover:border-yellow-500/60 transition-all">
              <p className="font-bold text-yellow-300 mb-3 text-lg">Formula: After [CURRENT HABIT], I will [NEW HABIT]</p>
              <p className="text-sm text-indigo-200/70 leading-relaxed">
                💡 <strong>Example:</strong> "After I pour my morning coffee, I will meditate for one minute"
              </p>
            </div>

            <div className="space-y-4">
              {habitStacks.map(stack => (
                <div key={stack.id} className="border-2 border-yellow-500/40 bg-gradient-to-r from-yellow-900/15 to-slate-800/40 rounded-2xl p-6 hover:border-yellow-500/60 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleHabitStack(stack.id)}
                      className={`mt-1 transition-all duration-300 flex-shrink-0 ${stack.completed ? 'text-yellow-400 scale-110' : 'text-yellow-500/70 hover:text-yellow-400'}`}
                    >
                      {stack.completed ? <CheckCircle size={40} className="fill-current" /> : <Circle size={40} />}
                    </button>

                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-yellow-300 mb-2">Current Habit (Trigger)</label>
                        <input
                          type="text"
                          placeholder="After I..."
                          value={stack.trigger}
                          onChange={(e) => updateHabitStack(stack.id, 'trigger', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-yellow-500/30 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-yellow-300 mb-2">New Habit (Action)</label>
                        <input
                          type="text"
                          placeholder="I will..."
                          value={stack.newHabit}
                          onChange={(e) => updateHabitStack(stack.id, 'newHabit', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-yellow-500/30 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40"
                        />
                      </div>

                      {stack.trigger && stack.newHabit && (
                        <div className="p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all">
                          <p className="text-sm text-indigo-100">
                            <strong className="text-yellow-300">Your Stack:</strong> After <span className="text-yellow-200">{stack.trigger}</span>, I will <span className="text-yellow-200">{stack.newHabit}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => deleteHabitStack(stack.id)}
                      className="text-red-500/70 hover:text-red-400 hover:scale-110 transition-all flex-shrink-0"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {habitStacks.length === 0 && (
              <div className="text-center py-16">
                <div className="p-4 bg-yellow-900/20 rounded-full inline-block mb-4">
                  <Zap size={64} className="text-yellow-400 opacity-70" />
                </div>
                <p className="text-2xl font-bold text-indigo-300 mb-2">No habit stacks yet</p>
                <p className="text-indigo-200/70 text-lg">Click "Add Stack" to link new habits!</p>
              </div>
            )}

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/25 to-orange-900/25 rounded-2xl border-2 border-yellow-500/40 hover:border-yellow-500/60 transition-all">
              <p className="text-indigo-100 leading-relaxed">
                <strong className="text-yellow-300 text-lg">🔗 Why Habit Stacking Works:</strong> Your current habits are already built into your brain. 
                By linking new behaviors to established patterns, you make remembering and executing new habits effortless.
              </p>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 border border-indigo-500/20 backdrop-blur-sm">
            <h2 className="text-4xl font-black text-indigo-300 mb-3 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-600/30 to-teal-600/30 rounded-xl border border-cyan-500/30">
                <CheckCircle className="text-cyan-400" size={32} />
              </div>
              Daily Task Manager
            </h2>
            
            <div className="flex gap-3 mb-8">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="flex-1 px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-cyan-500/30 rounded-xl focus:outline-none focus:border-cyan-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40 font-medium"
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-bold border border-cyan-500/50 hover:border-cyan-400"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-4 p-5 border-2 border-cyan-500/40 bg-gradient-to-r from-cyan-900/15 to-slate-800/40 rounded-2xl hover:border-cyan-500/60 hover:shadow-xl transition-all">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`transition-all duration-300 flex-shrink-0 ${task.completed ? 'text-cyan-400 scale-110' : 'text-cyan-500/70 hover:text-cyan-400'}`}
                  >
                    {task.completed ? <CheckCircle size={40} className="fill-current" /> : <Circle size={40} />}
                  </button>
                  <span className={`flex-1 text-lg font-medium ${task.completed ? 'line-through text-indigo-300/50' : 'text-indigo-100'}`}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500/70 hover:text-red-400 hover:scale-110 transition-all flex-shrink-0"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            {tasks.length === 0 && (
              <div className="text-center py-16">
                <div className="p-4 bg-cyan-900/20 rounded-full inline-block mb-4">
                  <CheckCircle size={64} className="text-cyan-400 opacity-70" />
                </div>
                <p className="text-2xl font-bold text-indigo-300 mb-2">No tasks yet</p>
                <p className="text-indigo-200/70 text-lg">Add your first task above!</p>
              </div>
            )}
          </div>
        )}

        {/* Weekly Tab */}
        {activeTab === 'weekly' && (
          <div className="space-y-8">
            {/* Current Week Goals */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 border border-indigo-500/20 backdrop-blur-sm">
              <h2 className="text-4xl font-black text-indigo-300 mb-3 flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-xl border border-indigo-500/30">
                  <Calendar className="text-indigo-400" size={32} />
                </div>
                Weekly Goals & Planning
              </h2>
              <p className="text-indigo-200/70 mb-8 text-lg font-medium">Weekly Design System: Take 30 minutes to create a plan for the week</p>

              <div className="space-y-4">
                {weeklyGoals.map(goal => (
                  <div key={goal.id} className="border-2 border-indigo-500/40 bg-gradient-to-r from-indigo-900/15 to-slate-800/40 rounded-2xl p-6 hover:border-indigo-500/60 hover:shadow-xl transition-all">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleWeeklyGoal(goal.id)}
                        className={`transition-all duration-300 flex-shrink-0 ${goal.completed ? 'text-indigo-400 scale-110' : 'text-indigo-500/70 hover:text-indigo-400'}`}
                      >
                        {goal.completed ? <CheckCircle size={40} className="fill-current" /> : <Circle size={40} />}
                      </button>
                      
                      <div className="flex-1 space-y-3">
                        <select
                          value={goal.category}
                          onChange={(e) => updateWeeklyGoal(goal.id, 'category', e.target.value)}
                          className="px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-indigo-500/30 rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 text-sm font-semibold"
                        >
                          <option>Health</option>
                          <option>Career</option>
                          <option>Personal</option>
                          <option>Relationships</option>
                          <option>Finance</option>
                        </select>
                        <input
                          type="text"
                          placeholder="What's your goal for this week?"
                          value={goal.goal}
                          onChange={(e) => updateWeeklyGoal(goal.id, 'goal', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-indigo-500/30 rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 placeholder-indigo-300/40 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setWeeklyGoals([...weeklyGoals, { id: Date.now(), goal: '', category: 'Personal', completed: false }])}
                className="mt-8 flex items-center gap-2 px-5 py-3 border-2 border-dashed border-indigo-500/40 text-indigo-300 rounded-xl hover:bg-indigo-900/20 hover:border-indigo-500/60 transition-all w-full justify-center font-bold text-lg hover:shadow-lg"
              >
                <Plus size={20} />
                Add Weekly Goal
              </button>
            </div>

            {/* Completed Goals History */}
            <WeeklyGoalsHistory getMonthsArchiveData={getMonthsArchiveData} />
          </div>
        )}

        {/* Gratitude Tab */}
        {activeTab === 'gratitude' && (
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl shadow-2xl p-8 border border-indigo-500/20 backdrop-blur-sm">
            <h2 className="text-4xl font-black text-indigo-300 mb-3 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-pink-600/30 to-rose-600/30 rounded-xl border border-pink-500/30">
                <Heart className="text-pink-400" size={32} />
              </div>
              Gratitude Journal
            </h2>
            <p className="text-indigo-200/70 mb-8 text-lg font-medium">Write three things you're grateful for today. Shift your mindset and increase happiness.</p>

            <div className="space-y-6">
              {gratitude.map((item, index) => (
                <div key={index} className="border-2 border-pink-500/40 rounded-2xl p-6 bg-gradient-to-br from-pink-900/20 to-slate-800/40 hover:border-pink-500/60 hover:shadow-xl transition-all">
                  <label className="block text-lg font-bold text-pink-300 mb-4 flex items-center gap-3">
                    <div className="p-2 bg-pink-600/30 rounded-lg">
                      <Heart size={20} className="fill-current text-pink-400" />
                    </div>
                    I'm grateful for #{index + 1}
                  </label>
                  <textarea
                    value={item}
                    onChange={(e) => updateGratitude(index, e.target.value)}
                    placeholder="What are you grateful for today?"
                    className="w-full px-4 py-3 bg-slate-700/50 text-indigo-100 border-2 border-pink-500/30 rounded-xl focus:outline-none focus:border-pink-400 focus:bg-slate-700 transition-all hover:bg-slate-700/70 resize-none placeholder-indigo-300/40 font-medium"
                    rows="3"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-pink-900/25 to-rose-900/25 rounded-2xl border-2 border-pink-500/40 hover:border-pink-500/60 transition-all">
              <p className="text-indigo-100 leading-relaxed">
                <strong className="text-pink-300 text-lg">💝 Daily Gratitude Practice:</strong> Research shows that practicing gratitude increases happiness, 
                reduces stress, and improves sleep quality. Make it part of your morning reflection time.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-indigo-400/50 text-sm">
        <p>Built with ❤️ for early risers and habit builders worldwide 🌅</p>
      </div>
    </div>
  );
};

export default AtomicProductivityApp;
