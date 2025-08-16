const employee = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "employee1@example.com",
    password: "123",
    tasks: [
      {
        taskNumber: 1,
        title: "Fix login bug",
        description: "Resolve issue with user login not working.",
        date: "2025-08-01",
        category: "Development",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        taskNumber: 2,
        title: "Update UI",
        description: "Revamp homepage with new branding.",
        date: "2025-08-05",
        category: "Design",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        taskNumber: 3,
        title: "Client meeting",
        description: "Discuss project milestones with client.",
        date: "2025-08-10",
        category: "Meeting",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ],
    taskStats: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    }
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        taskNumber: 1,
        title: "Write test cases",
        description: "Create unit tests for payment module.",
        date: "2025-08-03",
        category: "Testing",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        taskNumber: 2,
        title: "Deploy app",
        description: "Deploy latest build to staging server.",
        date: "2025-08-06",
        category: "Development",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        taskNumber: 3,
        title: "Prepare report",
        description: "Weekly project status update.",
        date: "2025-08-08",
        category: "Documentation",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      },
      {
        taskNumber: 4,
        title: "Design review",
        description: "Review UI design with the team.",
        date: "2025-08-12",
        category: "Design",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      }
    ],
    taskStats: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 1
    }
  },
  {
    id: 3,
    name: "Ravi Kumar",
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        taskNumber: 1,
        title: "API integration",
        description: "Integrate payment gateway API.",
        date: "2025-08-04",
        category: "Development",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        taskNumber: 2,
        title: "Bug fix in dashboard",
        description: "Fix data rendering issue on dashboard.",
        date: "2025-08-09",
        category: "Development",
        active: false,
        newTask: true,
        completed: true,
        failed: false
      },
      {
        taskNumber: 3,
        title: "User testing",
        description: "Collect feedback from beta testers.",
        date: "2025-08-11",
        category: "Testing",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ],
    taskStats: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    }
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        taskNumber: 1,
        title: "Update documentation",
        description: "Add API usage examples to docs.",
        date: "2025-08-02",
        category: "Documentation",
        active: false,
        newTask: true,
        completed: true,
        failed: false
      },
      {
        taskNumber: 2,
        title: "Create wireframes",
        description: "Design wireframes for new feature.",
        date: "2025-08-07",
        category: "Design",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        taskNumber: 3,
        title: "Security audit",
        description: "Run vulnerability scan on app.",
        date: "2025-08-09",
        category: "Testing",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      },
      {
        taskNumber: 4,
        title: "Team meeting",
        description: "Weekly sprint planning.",
        date: "2025-08-13",
        category: "Meeting",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ],
    taskStats: {
      active: 1,
      newTask: 2,
      completed: 2,
      failed: 1
    }
  },
  {
    id: 5,
    name: "Arjun Mehta",
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        taskNumber: 1,
        title: "Optimize queries",
        description: "Improve DB performance by query tuning.",
        date: "2025-08-05",
        category: "Development",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        taskNumber: 2,
        title: "Logo design",
        description: "Create new logo for the product.",
        date: "2025-08-08",
        category: "Design",
        active: false,
        newTask: true,
        completed: true,
        failed: false
      },
      {
        taskNumber: 3,
        title: "Testing new release",
        description: "Perform regression testing.",
        date: "2025-08-12",
        category: "Testing",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ],
    taskStats: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    }
  }
];

const admin = [
  {
    id: 1,
    name: "Rahul Kapoor",
    email: "admin@example.com",
    password: "123"
  }
];



export const setLocalStorage = () => {
  localStorage.setItem("employee", JSON.stringify(employee));
  localStorage.setItem("admin", JSON.stringify(admin));
};
export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employee'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  return {employees,admin}
  
};
