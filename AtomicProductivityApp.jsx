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

      const stacksResult = await storage.get('habit-stacks');
      if (stacksResult && stacksResult.value) {
        setHabitStacks(JSON.parse(stacksResult.value));
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
        date: currentDate,
        savedAt: new Date().toISOString()
      };
      
      await storage.set(dateKey, JSON.stringify(data));
      await storage.set('stats', JSON.stringify(stats));
      await storage.set('weekly-goals', JSON.stringify(weeklyGoals));
      await storage.set('identity', JSON.stringify(identity));
      await storage.set('habit-stacks', JSON.stringify(habitStacks));
    } catch (error) {
      console.error('Error saving data:', error);
    }
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

  const exportToGoogleCalendar = () => {
    try {
      let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Atomic 5 AM Club//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n';
      
      // Add Victory Hour
      if (morningRoutine.move.activity || morningRoutine.reflect.activity || morningRoutine.grow.activity) {
        const date = currentDate.replace(/-/g, '');
        const description = `MOVE: ${morningRoutine.move.activity || 'Not specified'}\\nREFLECT: ${morningRoutine.reflect.activity || 'Not specified'}\\nGROW: ${morningRoutine.grow.activity || 'Not specified'}`;
        
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `DTSTART:${date}T050000\n`;
        icsContent += `DTEND:${date}T060000\n`;
        icsContent += `SUMMARY:Victory Hour - 20/20/20 Formula\n`;
        icsContent += `DESCRIPTION:${description}\n`;
        icsContent += `UID:victory-hour-${date}@atomic5amclub\n`;
        icsContent += 'BEGIN:VALARM\n';
        icsContent += 'TRIGGER:-PT15M\n';
        icsContent += 'ACTION:DISPLAY\n';
        icsContent += 'DESCRIPTION:Victory Hour starts in 15 minutes!\n';
        icsContent += 'END:VALARM\n';
        icsContent += 'END:VEVENT\n';
      }
      
      // Add time blocks
      timeBlocks.forEach((block) => {
        if (block.activity && block.time) {
          const date = currentDate.replace(/-/g, '');
          const timeMatch = block.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
          
          if (timeMatch) {
            let [, hours, minutes, period] = timeMatch;
            hours = parseInt(hours);
            
            if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
            if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
            
            const startTime = `${date}T${hours.toString().padStart(2, '0')}${minutes}00`;
            const endHour = hours + Math.floor(block.duration / 60);
            const endMinutes = (parseInt(minutes) + (block.duration % 60)).toString().padStart(2, '0');
            const endTime = `${date}T${endHour.toString().padStart(2, '0')}${endMinutes}00`;
            
            icsContent += 'BEGIN:VEVENT\n';
            icsContent += `DTSTART:${startTime}\n`;
            icsContent += `DTEND:${endTime}\n`;
            icsContent += `SUMMARY:${block.activity}\n`;
            icsContent += `DESCRIPTION:${block.category.toUpperCase()} - ${block.duration} minutes\n`;
            icsContent += `UID:${block.id}-${date}@atomic5amclub\n`;
            icsContent += 'BEGIN:VALARM\n';
            icsContent += 'TRIGGER:-PT10M\n';
            icsContent += 'ACTION:DISPLAY\n';
            icsContent += `DESCRIPTION:${block.activity} starts in 10 minutes!\n`;
            icsContent += 'END:VALARM\n';
            icsContent += 'END:VEVENT\n';
          }
        }
      });
      
      icsContent += 'END:VCALENDAR';
      
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `atomic-5am-schedule-${currentDate}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('✅ Calendar exported! Open the file on your phone to import and get alerts.');
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting calendar. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-amber-400 mx-auto mb-6"></div>
            <Sun className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-400 animate-pulse" size={32} />
          </div>
          <p className="text-amber-100 text-lg font-semibold">Loading your productivity dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-bounce bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl text-2xl font-bold">
            🎉 Victory Hour Complete! 🎉
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 mb-6 border border-amber-500/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent animate-gradient">
                Atomic 5 AM Club
              </h1>
              <p className="text-amber-100/80 mt-2 font-medium">Build atomic habits, own your morning, elevate your life</p>
            </div>
            <div className="text-right">
              <input 
                type="date" 
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="px-4 py-3 bg-slate-700 text-amber-100 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:border-amber-500 transition-all font-semibold"
              />
              <p className="text-sm text-amber-200/60 mt-2">Day {stats.totalDays} of your journey</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="text-blue-100" size={20} />
                <span className="text-sm text-blue-100 font-semibold">Current Streak</span>
              </div>
              <p className="text-3xl font-black text-white">{stats.currentStreak}</p>
              <p className="text-xs text-blue-100">days</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-emerald-100" size={20} />
                <span className="text-sm text-emerald-100 font-semibold">Perfect Days</span>
              </div>
              <p className="text-3xl font-black text-white">{stats.perfectDays}</p>
              <p className="text-xs text-emerald-100">completed</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="text-amber-100" size={20} />
                <span className="text-sm text-amber-100 font-semibold">Morning Routine</span>
              </div>
              <p className="text-3xl font-black text-white">{Math.round(getMorningProgress())}%</p>
              <p className="text-xs text-amber-100">complete</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-purple-100" size={20} />
                <span className="text-sm text-purple-100 font-semibold">Habits Today</span>
              </div>
              <p className="text-3xl font-black text-white">{getHabitCompletionRate()}%</p>
              <p className="text-xs text-purple-100">done</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl mb-6 p-3 border border-amber-500/20">
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
                  className={`py-3 px-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105'
                      : 'text-amber-100/70 hover:bg-slate-700/50 hover:text-amber-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Morning Tab */}
        {activeTab === 'morning' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
            <h2 className="text-3xl font-black text-amber-400 mb-6 flex items-center gap-3">
              <Sun className="text-amber-500" size={36} />
              Victory Hour: 20/20/20 Formula
            </h2>
            <p className="text-amber-100/80 mb-8 text-lg">The first hour of your day split into three 20-minute periods. Master your morning, master your life.</p>
            
            <div className="space-y-6">
              {/* Move */}
              <div className="border-2 border-orange-500/50 rounded-2xl p-6 bg-gradient-to-br from-orange-900/30 to-slate-800/50 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => toggleMorningActivity('move')}
                    className="text-orange-400 hover:scale-110 transition-transform"
                  >
                    {morningRoutine.move.completed ? 
                      <CheckCircle size={40} className="fill-current" /> : 
                      <Circle size={40} />
                    }
                  </button>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-400">5:00 - 5:20 AM: MOVE</h3>
                    <p className="text-sm text-orange-200/70">Vigorous exercise to boost BDNF, dopamine & serotonin</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="What exercise did you do? (e.g., jogging, yoga, HIIT)"
                  value={morningRoutine.move.activity}
                  onChange={(e) => updateMorningActivity('move', 'activity', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 text-amber-100 border-2 border-orange-500/30 rounded-xl focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              {/* Reflect */}
              <div className="border-2 border-purple-500/50 rounded-2xl p-6 bg-gradient-to-br from-purple-900/30 to-slate-800/50 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => toggleMorningActivity('reflect')}
                    className="text-purple-400 hover:scale-110 transition-transform"
                  >
                    {morningRoutine.reflect.completed ? 
                      <CheckCircle size={40} className="fill-current" /> : 
                      <Circle size={40} />
                    }
                  </button>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400">5:20 - 5:40 AM: REFLECT</h3>
                    <p className="text-sm text-purple-200/70">Meditation, journaling, visualization, prayer</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="What reflection practice? (e.g., meditation, journaling, prayer)"
                  value={morningRoutine.reflect.activity}
                  onChange={(e) => updateMorningActivity('reflect', 'activity', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 text-amber-100 border-2 border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500 transition-all mb-4"
                />
                
                <div className="p-4 bg-slate-700/50 rounded-xl border border-purple-500/30">
                  <h4 className="font-bold text-purple-300 mb-3 flex items-center gap-2">
                    <Target size={18} />
                    Daily Five Concept: List 5 targets for today
                  </h4>
                  <div className="space-y-2">
                    {dailyFive.map((item, index) => (
                      <input
                        key={index}
                        type="text"
                        placeholder={`🎯 Target ${index + 1}`}
                        value={item}
                        onChange={(e) => updateDailyFive(index, e.target.value)}
                        className="w-full px-3 py-2 bg-slate-600 text-amber-100 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Grow */}
              <div className="border-2 border-emerald-500/50 rounded-2xl p-6 bg-gradient-to-br from-emerald-900/30 to-slate-800/50 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => toggleMorningActivity('grow')}
                    className="text-emerald-400 hover:scale-110 transition-transform"
                  >
                    {morningRoutine.grow.completed ? 
                      <CheckCircle size={40} className="fill-current" /> : 
                      <Circle size={40} />
                    }
                  </button>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-400">5:40 - 6:00 AM: GROW</h3>
                    <p className="text-sm text-emerald-200/70">Reading, learning, skill development</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="What did you learn? (e.g., read 20 pages, online course, podcast)"
                  value={morningRoutine.grow.activity}
                  onChange={(e) => updateMorningActivity('grow', 'activity', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 text-amber-100 border-2 border-emerald-500/30 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-amber-900/40 to-orange-900/40 rounded-2xl border-2 border-amber-500/30">
              <p className="text-amber-100 flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <span><strong className="text-amber-400">Remember:</strong> It takes 66 days to reach automaticity. Stay consistent, and never miss twice!</span>
              </p>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-black text-amber-400 flex items-center gap-3">
                  <Clock className="text-amber-500" size={36} />
                  Daily Time Blocking
                </h2>
                <p className="text-amber-100/80 mt-2">Plan your day from 5 AM to 11 PM with focused time blocks</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addTimeBlock}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-bold"
                >
                  <Plus size={20} />
                  Add Block
                </button>
                <button
                  onClick={exportToGoogleCalendar}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all font-bold"
                >
                  <Download size={20} />
                  Export
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6 p-4 bg-blue-900/30 rounded-xl border-2 border-blue-500/30">
              <div className="flex items-start gap-3">
                <Bell className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div className="text-sm text-blue-200">
                  <p className="font-bold mb-2">📱 Get Phone Alerts:</p>
                  <ol className="list-decimal ml-4 space-y-1">
                    <li>Fill in your time blocks below</li>
                    <li>Click "Export" to download .ics file</li>
                    <li>Open file on your phone to import to Google Calendar</li>
                    <li>Enable notifications in calendar settings</li>
                    <li>Get alerts 10-15 minutes before each block!</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Time Blocks */}
            <div className="space-y-3">
              {timeBlocks.sort((a, b) => {
                const timeA = a.time.toLowerCase().includes('pm') && !a.time.startsWith('12') 
                  ? parseInt(a.time) + 12 : parseInt(a.time);
                const timeB = b.time.toLowerCase().includes('pm') && !b.time.startsWith('12')
                  ? parseInt(b.time) + 12 : parseInt(b.time);
                return timeA - timeB;
              }).map(block => (
                <div key={block.id} className={`border-2 rounded-2xl p-4 transition-all hover:shadow-lg ${getCategoryColor(block.category)}`}>
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTimeBlock(block.id)}
                      className="mt-1 hover:scale-110 transition-transform"
                    >
                      {block.completed ? <CheckCircle size={28} className="fill-current" /> : <Circle size={28} />}
                    </button>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <select
                          value={block.time}
                          onChange={(e) => updateTimeBlock(block.id, 'time', e.target.value)}
                          className="px-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-amber-500 bg-white font-semibold"
                        >
                          <option value="">Select Time</option>
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={block.duration}
                            onChange={(e) => updateTimeBlock(block.id, 'duration', parseInt(e.target.value))}
                            placeholder="Duration"
                            className="w-24 px-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-amber-500 font-semibold"
                            min="5"
                            step="5"
                          />
                          <span className="text-sm font-semibold">min</span>
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="What will you do during this block?"
                        value={block.activity}
                        onChange={(e) => updateTimeBlock(block.id, 'activity', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-amber-500 font-medium"
                      />

                      <select
                        value={block.category}
                        onChange={(e) => updateTimeBlock(block.id, 'category', e.target.value)}
                        className="px-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-amber-500 text-sm bg-white font-semibold"
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
                      className="text-red-500 hover:text-red-700 hover:scale-110 transition-all mt-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {timeBlocks.length === 0 && (
              <div className="text-center py-16 text-amber-400/50">
                <Clock size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">No time blocks yet</p>
                <p className="text-sm mt-2">Click "Add Block" to start planning your day!</p>
              </div>
            )}
          </div>
        )}

        {/* Habits Tab */}
        {activeTab === 'habits' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-black text-amber-400 flex items-center gap-3">
                  <Target className="text-amber-500" size={36} />
                  Atomic Habits Tracker
                </h2>
                <p className="text-amber-100/80 mt-2">Focus on being 1% better every day</p>
              </div>
              <button
                onClick={addHabit}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all font-bold"
              >
                <Plus size={20} />
                Add Habit
              </button>
            </div>

            <div className="space-y-4">
              {habits.map(habit => (
                <div key={habit.id} className="border-2 border-amber-500/30 bg-slate-700/30 rounded-2xl p-4 hover:border-amber-500/50 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className="text-amber-400 hover:scale-110 transition-transform"
                    >
                      {habit.completed ? <CheckCircle size={32} className="fill-current" /> : <Circle size={32} />}
                    </button>
                    
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Habit name (e.g., Exercise for 30 minutes)"
                        value={habit.name}
                        onChange={(e) => updateHabit(habit.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-600 text-amber-100 border-2 border-amber-500/30 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Two-minute version (e.g., Put on workout clothes)"
                        value={habit.twoMinuteVersion}
                        onChange={(e) => updateHabit(habit.id, 'twoMinuteVersion', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-600 text-amber-100 border-2 border-amber-500/30 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                      />
                      <select
                        value={habit.category}
                        onChange={(e) => updateHabit(habit.id, 'category', e.target.value)}
                        className="px-3 py-2 bg-slate-600 text-amber-100 border-2 border-amber-500/30 rounded-lg focus:outline-none focus:border-amber-500 text-sm font-semibold"
                      >
                        <option>Morning</option>
                        <option>Health</option>
                        <option>Growth</option>
                        <option>Personal</option>
                        <option>Work</option>
                      </select>
                    </div>

                    <div className="text-center bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-3 min-w-[80px]">
                      <div className="flex items-center justify-center gap-1">
                        <Flame className="text-white" size={20} />
                        <div className="text-2xl font-black text-white">{habit.streak}</div>
                      </div>
                      <div className="text-xs text-white/90 font-semibold">day streak</div>
                    </div>

                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-400 hover:text-red-500 hover:scale-110 transition-all"
                    >
                      <Trash2 size={20} />
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
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
            <h2 className="text-3xl font-black text-amber-400 mb-6 flex items-center gap-3">
              <Star className="text-amber-500" size={36} />
              Identity-Based Habits
            </h2>
            <p className="text-amber-100/80 mb-8 text-lg">
              Focus not on what you want to achieve, but on who you wish to become. Every action is a vote for your new identity.
            </p>

            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl p-6 border-2 border-indigo-500/30 mb-6">
              <label className="block text-xl font-bold text-indigo-300 mb-3">
                Who do you want to become?
              </label>
              <textarea
                value={identity.statement}
                onChange={(e) => setIdentity({ statement: e.target.value, updated: true })}
                placeholder="I am someone who..."
                className="w-full px-4 py-4 bg-slate-700 text-amber-100 border-2 border-indigo-500/30 rounded-xl focus:outline-none focus:border-indigo-500 resize-none font-medium"
                rows="4"
              />
              <p className="text-sm text-indigo-200/70 mt-3">
                Examples: "I am someone who never misses workouts" • "I am a writer who publishes every day" • "I am an early riser who owns my mornings"
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-amber-400">How your habits support your identity:</h3>
              
              {habits.map(habit => (
                <div key={habit.id} className="bg-slate-700/30 border-2 border-amber-500/30 rounded-2xl p-5 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    {habit.completed ? (
                      <CheckCircle className="text-emerald-400" size={28} className="fill-current" />
                    ) : (
                      <Circle className="text-amber-400/50" size={28} />
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-amber-100 text-lg">{habit.name || 'Unnamed habit'}</p>
                      <p className="text-sm text-amber-200/70">
                        ✓ Every completion is a vote for your new identity
                      </p>
                    </div>
                    <div className="text-center bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-3">
                      <div className="text-2xl font-black text-white">{habit.streak}</div>
                      <div className="text-xs text-white/90 font-semibold">votes cast</div>
                    </div>
                  </div>
                </div>
              ))}

              {habits.length === 0 && (
                <div className="text-center py-12 text-amber-400/50">
                  <p>Add habits in the Habits tab to track your identity votes</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-amber-900/40 to-orange-900/40 rounded-2xl border-2 border-amber-500/30">
              <p className="text-amber-100">
                <strong className="text-amber-400 text-lg">💡 Key Insight:</strong> Your habits embody your identity. Small wins are evidence of your new self. 
                The goal isn't to run a marathon; it's to become a runner. The goal isn't to write a book; it's to become a writer.
              </p>
            </div>
          </div>
        )}

        {/* Habit Stacking Tab */}
        {activeTab === 'stacking' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-black text-amber-400 flex items-center gap-3">
                  <Zap className="text-amber-500" size={36} />
                  Habit Stacking
                </h2>
                <p className="text-amber-100/80 mt-2">Link new habits to existing ones for automatic success</p>
              </div>
              <button
                onClick={addHabitStack}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:shadow-lg transition-all font-bold"
              >
                <Plus size={20} />
                Add Stack
              </button>
            </div>

            <div className="mb-6 p-4 bg-blue-900/30 rounded-xl border-2 border-blue-500/30">
              <p className="font-bold text-blue-300 mb-2">Formula: After [CURRENT HABIT], I will [NEW HABIT]</p>
              <p className="text-sm text-blue-200/70">
                Example: "After I pour my morning coffee, I will meditate for one minute"
              </p>
            </div>

            <div className="space-y-4">
              {habitStacks.map(stack => (
                <div key={stack.id} className="border-2 border-amber-500/30 bg-slate-700/30 rounded-2xl p-4 hover:border-amber-500/50 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleHabitStack(stack.id)}
                      className="text-amber-400 mt-2 hover:scale-110 transition-transform"
                    >
                      {stack.completed ? <CheckCircle size={28} className="fill-current" /> : <Circle size={28} />}
                    </button>

                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-sm font-bold text-amber-300 mb-2">Current Habit (Trigger)</label>
                        <input
                          type="text"
                          placeholder="After I..."
                          value={stack.trigger}
                          onChange={(e) => updateHabitStack(stack.id, 'trigger', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-600 text-amber-100 border-2 border-amber-500/30 rounded-lg focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-amber-300 mb-2">New Habit (Action)</label>
                        <input
                          type="text"
                          placeholder="I will..."
                          value={stack.newHabit}
                          onChange={(e) => updateHabitStack(stack.id, 'newHabit', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-600 text-amber-100 border-2 border-amber-500/30 rounded-lg focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {stack.trigger && stack.newHabit && (
                        <div className="p-4 bg-indigo-900/40 rounded-lg border-2 border-indigo-500/30">
                          <p className="text-sm text-indigo-200">
                            <strong className="text-indigo-300">Your Stack:</strong> After {stack.trigger}, I will {stack.newHabit}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => deleteHabitStack(stack.id)}
                      className="text-red-400 hover:text-red-500 hover:scale-110 transition-all mt-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {habitStacks.length === 0 && (
              <div className="text-center py-16 text-amber-400/50">
                <Zap size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">No habit stacks yet</p>
                <p className="text-sm mt-2">Click "Add Stack" to link new habits!</p>
              </div>
            )}

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border-2 border-purple-500/30">
              <p className="text-purple-100">
                <strong className="text-purple-300 text-lg">🔗 Why Habit Stacking Works:</strong> Your current habits are already built into your brain. 
                By linking new behaviors to established patterns, you make remembering and executing new habits effortless.
              </p>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
            <h2 className="text-3xl font-black text-amber-400 mb-6 flex items-center gap-3">
              <CheckCircle className="text-amber-500" size={36} />
              Daily Task Manager
            </h2>
            
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="flex-1 px-4 py-3 bg-slate-700 text-amber-100 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all font-bold"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-4 border-2 border-amber-500/30 bg-slate-700/30 rounded-xl hover:border-amber-500/50 hover:shadow-lg transition-all">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-amber-400 hover:scale-110 transition-transform"
                  >
                    {task.completed ? <CheckCircle size={28} className="fill-current" /> : <Circle size={28} />}
                  </button>
                  <span className={`flex-1 text-lg ${task.completed ? 'line-through text-amber-400/50' : 'text-amber-100'}`}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-500 hover:scale-110 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {tasks.length === 0 && (
              <div className="text-center py-16 text-amber-400/50">
                <CheckCircle size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">No tasks yet</p>
                <p className="text-sm mt-2">Add your first task above!</p>
              </div>
            )}
          </div>
        )}

        {/* Weekly Tab */}
        {activeTab === 'weekly' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
            <h2 className="text-3xl font-black text-amber-400 mb-6 flex items-center gap-3">
              <Calendar className="text-amber-500" size={36} />
              Weekly Goals & Planning
            </h2>
            <p className="text-amber-100/80 mb-8 text-lg">Weekly Design System: Take 30 minutes to create a plan for the week</p>

            <div className="space-y-4">
              {weeklyGoals.map(goal => (
                <div key={goal.id} className="border-2 border-amber-500/30 bg-slate-700/30 rounded-2xl p-4 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleWeeklyGoal(goal.id)}
                      className="text-amber-400 hover:scale-110 transition-transform"
                    >
                      {goal.completed ? <CheckCircle size={28} className="fill-current" /> : <Circle size={28} />}
                    </button>
                    
                    <div className="flex-1 space-y-2">
                      <select
                        value={goal.category}
                        onChange={(e) => updateWeeklyGoal(goal.id, 'category', e.target.value)}
                        className="px-3 py-2 bg-slate-600 text-amber-100 border-2 border-amber-500/30 rounded-lg focus:outline-none focus:border-amber-500 text-sm font-semibold"
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
                        className="w-full px-3 py-2 bg-slate-600 text-amber-100 border-2 border-amber-500/30 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setWeeklyGoals([...weeklyGoals, { id: Date.now(), goal: '', category: 'Personal', completed: false }])}
              className="mt-6 flex items-center gap-2 px-4 py-3 border-2 border-dashed border-amber-500/30 text-amber-400 rounded-xl hover:bg-slate-700/30 hover:border-amber-500/50 transition-all w-full justify-center font-bold"
            >
              <Plus size={20} />
              Add Weekly Goal
            </button>
          </div>
        )}

        {/* Gratitude Tab */}
        {activeTab === 'gratitude' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-amber-500/20">
            <h2 className="text-3xl font-black text-amber-400 mb-6 flex items-center gap-3">
              <Heart className="text-pink-500" size={36} />
              Gratitude Journal
            </h2>
            <p className="text-amber-100/80 mb-8 text-lg">Write three things you're grateful for today. Shift your mindset and increase happiness.</p>

            <div className="space-y-6">
              {gratitude.map((item, index) => (
                <div key={index} className="border-2 border-pink-500/50 rounded-2xl p-6 bg-gradient-to-br from-pink-900/30 to-slate-800/50 hover:shadow-xl transition-all">
                  <label className="block text-lg font-bold text-pink-300 mb-3 flex items-center gap-2">
                    <Heart size={20} className="fill-current" />
                    I'm grateful for #{index + 1}
                  </label>
                  <textarea
                    value={item}
                    onChange={(e) => updateGratitude(index, e.target.value)}
                    placeholder="What are you grateful for today?"
                    className="w-full px-4 py-3 bg-slate-700 text-amber-100 border-2 border-pink-500/30 rounded-xl focus:outline-none focus:border-pink-500 resize-none"
                    rows="3"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-2xl border-2 border-pink-500/30">
              <p className="text-pink-100">
                <strong className="text-pink-300 text-lg">💝 Daily Gratitude Practice:</strong> Research shows that practicing gratitude increases happiness, 
                reduces stress, and improves sleep quality. Make it part of your morning reflection time.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-amber-400/50 text-sm">
        <p>Built with ❤️ for early risers and habit builders worldwide 🌅</p>
      </div>
    </div>
  );
};

export default AtomicProductivityApp;
