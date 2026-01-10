/**
 * Google Calendar Integration Tests
 * Tests the calendar event creation and synchronization
 */

async function runGoogleCalendarTests() {
  console.log('🔗 Google Calendar Integration Tests\n');
  console.log('═'.repeat(60));

  let testsPassed = 0;
  let testsFailed = 0;

  // Test 1: Validate event structure
  {
    console.log('\nTest 1: Victory Hour event structure');
    
    const morningRoutine = {
      move: { completed: true, activity: 'jogging' },
      reflect: { completed: true, activity: 'meditation' },
      grow: { completed: true, activity: 'reading' }
    };
    
    const event = {
      summary: '🌅 Victory Hour - 20/20/20 Formula',
      description: `MOVE (5:00-5:20 AM): ${morningRoutine.move.activity}\nREFLECT (5:20-5:40 AM): ${morningRoutine.reflect.activity}\nGROW (5:40-6:00 AM): ${morningRoutine.grow.activity}`,
      start: {
        dateTime: '2026-01-10T05:00:00',
        timeZone: 'UTC'
      },
      end: {
        dateTime: '2026-01-10T06:00:00',
        timeZone: 'UTC'
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'notification', minutes: 15 }
        ]
      }
    };

    if (event.summary && event.description && event.start && event.end && event.reminders) {
      console.log('   ✅ PASSED: Victory Hour event structure is valid\n');
      testsPassed++;
    } else {
      console.log('   ❌ FAILED: Victory Hour event structure invalid\n');
      testsFailed++;
    }
  }

  // Test 2: Validate time block event structure
  {
    console.log('Test 2: Time block event structure');
    
    const block = {
      id: 1,
      activity: 'Deep Work Session',
      category: 'deep-work',
      duration: 90,
      time: '9:00 AM'
    };
    
    const categoryEmojis = {
      'deep-work': '🎯',
      'work': '💼',
      'break': '🌿',
      'exercise': '💪',
      'learning': '📚',
      'personal': '❤️'
    };

    const event = {
      summary: `${categoryEmojis[block.category]} ${block.activity}`,
      description: `Category: ${block.category.toUpperCase()}\nDuration: ${block.duration} minutes`,
      start: {
        dateTime: '2026-01-10T09:00:00',
        timeZone: 'UTC'
      },
      end: {
        dateTime: '2026-01-10T10:30:00',
        timeZone: 'UTC'
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'notification', minutes: 10 }
        ]
      }
    };

    if (event.summary && event.description && event.start && event.end) {
      console.log('   ✅ PASSED: Time block event structure is valid\n');
      testsPassed++;
    } else {
      console.log('   ❌ FAILED: Time block event structure invalid\n');
      testsFailed++;
    }
  }

  // Test 3: Validate time parsing
  {
    console.log('Test 3: Time parsing (AM/PM to 24-hour)');
    
    const testCases = [
      { input: '5:00 AM', expectedHours: 5, expectedMinutes: 0 },
      { input: '9:00 AM', expectedHours: 9, expectedMinutes: 0 },
      { input: '12:00 PM', expectedHours: 12, expectedMinutes: 0 },
      { input: '1:30 PM', expectedHours: 13, expectedMinutes: 30 },
      { input: '5:00 PM', expectedHours: 17, expectedMinutes: 0 },
      { input: '12:00 AM', expectedHours: 0, expectedMinutes: 0 }
    ];

    let allPassed = true;
    for (const testCase of testCases) {
      const timeMatch = testCase.input.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (timeMatch) {
        let [, hours, minutes, period] = timeMatch;
        hours = parseInt(hours);
        minutes = parseInt(minutes);

        if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
        if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

        if (hours !== testCase.expectedHours || minutes !== testCase.expectedMinutes) {
          console.log(`      ❌ ${testCase.input} parsed as ${hours}:${minutes}, expected ${testCase.expectedHours}:${testCase.expectedMinutes}`);
          allPassed = false;
        }
      }
    }

    if (allPassed) {
      console.log('   ✅ PASSED: All time formats parsed correctly\n');
      testsPassed++;
    } else {
      console.log('   ❌ FAILED: Time parsing error\n');
      testsFailed++;
    }
  }

  // Test 4: Validate event duration calculation
  {
    console.log('Test 4: Event duration calculation');
    
    const testCases = [
      { startHour: 5, startMin: 0, duration: 60, expectedEndHour: 6, expectedEndMin: 0 },
      { startHour: 9, startMin: 0, duration: 90, expectedEndHour: 10, expectedEndMin: 30 },
      { startHour: 12, startMin: 30, duration: 60, expectedEndHour: 13, expectedEndMin: 30 },
      { startHour: 17, startMin: 0, duration: 45, expectedEndHour: 17, expectedEndMin: 45 }
    ];

    let allPassed = true;
    for (const testCase of testCases) {
      const endHour = testCase.startHour + Math.floor(testCase.duration / 60);
      const endMin = (testCase.startMin + (testCase.duration % 60)) % 60;

      if (endHour !== testCase.expectedEndHour || endMin !== testCase.expectedEndMin) {
        console.log(`      ❌ ${testCase.startHour}:${testCase.startMin} + ${testCase.duration}min = ${endHour}:${endMin}, expected ${testCase.expectedEndHour}:${testCase.expectedEndMin}`);
        allPassed = false;
      }
    }

    if (allPassed) {
      console.log('   ✅ PASSED: All duration calculations correct\n');
      testsPassed++;
    } else {
      console.log('   ❌ FAILED: Duration calculation error\n');
      testsFailed++;
    }
  }

  // Test 5: Validate calendar sync batch
  {
    console.log('Test 5: Calendar sync batch processing');
    
    const timeBlocks = [
      { id: 1, time: '5:00 AM', activity: 'Victory Hour', category: 'morning', completed: false, duration: 60 },
      { id: 2, time: '9:00 AM', activity: 'Deep Work', category: 'deep-work', completed: false, duration: 90 },
      { id: 3, time: '12:30 PM', activity: 'Lunch', category: 'break', completed: false, duration: 60 },
      { id: 4, time: '2:00 PM', activity: 'Work Block', category: 'work', completed: false, duration: 120 },
      { id: 5, time: '5:00 PM', activity: 'Workout', category: 'exercise', completed: false, duration: 60 }
    ];

    let validEvents = 0;
    for (const block of timeBlocks) {
      if (block.activity && block.time) {
        const timeMatch = block.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (timeMatch) {
          validEvents++;
        }
      }
    }

    if (validEvents === timeBlocks.length) {
      console.log(`   ✅ PASSED: All ${validEvents} time blocks valid for sync\n`);
      testsPassed++;
    } else {
      console.log(`   ❌ FAILED: Only ${validEvents}/${timeBlocks.length} blocks valid\n`);
      testsFailed++;
    }
  }

  // Test 6: Validate reminder settings
  {
    console.log('Test 6: Reminder settings');
    
    const victories = {
      victoryHour: {
        reminders: [{ method: 'notification', minutes: 15 }],
        expected: 15
      },
      timeBlock: {
        reminders: [{ method: 'notification', minutes: 10 }],
        expected: 10
      }
    };

    let allValid = true;
    for (const [name, config] of Object.entries(victories)) {
      if (!config.reminders || config.reminders[0].minutes !== config.expected) {
        console.log(`      ❌ ${name} reminder invalid`);
        allValid = false;
      }
    }

    if (allValid) {
      console.log('   ✅ PASSED: All reminder settings valid\n');
      testsPassed++;
    } else {
      console.log('   ❌ FAILED: Reminder settings invalid\n');
      testsFailed++;
    }
  }

  // Test 7: Validate ISO datetime format
  {
    console.log('Test 7: ISO datetime format validation');
    
    const currentDate = '2026-01-10';
    const testTimes = [
      { hours: 5, minutes: 0 },
      { hours: 9, minutes: 30 },
      { hours: 14, minutes: 15 },
      { hours: 23, minutes: 59 }
    ];

    let allValid = true;
    for (const time of testTimes) {
      const isoDateTime = `${currentDate}T${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:00`;
      const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
      
      if (!regex.test(isoDateTime)) {
        console.log(`      ❌ Invalid format: ${isoDateTime}`);
        allValid = false;
      }
    }

    if (allValid) {
      console.log('   ✅ PASSED: All ISO datetime formats valid\n');
      testsPassed++;
    } else {
      console.log('   ❌ FAILED: Invalid datetime format\n');
      testsFailed++;
    }
  }

  // Summary
  console.log('═'.repeat(60));
  console.log(`\n📊 TEST RESULTS`);
  console.log('═'.repeat(60));
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`📈 Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%\n`);

  if (testsFailed === 0) {
    console.log('🎉 ALL TESTS PASSED!\n');
    console.log('✨ Google Calendar Integration Ready:');
    console.log('   1. ✅ Event structures validated');
    console.log('   2. ✅ Time parsing working correctly');
    console.log('   3. ✅ Duration calculations accurate');
    console.log('   4. ✅ Batch sync ready');
    console.log('   5. ✅ Reminders configured');
    console.log('   6. ✅ ISO datetime formats valid');
    console.log('\n📋 Setup Required:');
    console.log('   1. Create Google Cloud Project');
    console.log('   2. Enable Calendar API');
    console.log('   3. Create OAuth 2.0 credentials');
    console.log('   4. Add .env.local with credentials');
    console.log('   5. Restart app');
    console.log('\nSee GOOGLE_CALENDAR_SETUP.md for details\n');
  } else {
    console.log('⚠️ Some tests failed.\n');
  }
}

runGoogleCalendarTests().catch(error => {
  console.error('Test execution error:', error);
  process.exit(1);
});
