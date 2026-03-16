export type Activity = {
  id: string;
  name: string;
  description: string;
  date: string;
  type: 'Hackathon' | 'Workshop' | 'Sports' | 'Internship' | 'Certification';
  certificateUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  skills: string[];
};

export type Student = {
  id: string; // Student ID
  name: string;
  department: string;
  year: number;
  email: string;
  avatarUrl: string;
  activities: Activity[];
};

export const mockStudent: Student = {
  id: 'S12345',
  name: 'Jane Doe',
  department: 'Computer Science',
  year: 3,
  email: 'jane.doe@university.edu',
  avatarUrl: 'https://picsum.photos/seed/2/200/200',
  activities: [
    {
      id: 'act_1',
      name: 'National Hackathon 2024',
      description: 'Developed a web application for social good. Led a team of 4 and won 2nd place.',
      date: '2024-05-15',
      type: 'Hackathon',
      status: 'approved',
      skills: ['Problem Solving', 'Teamwork', 'Leadership', 'React', 'Node.js'],
    },
    {
      id: 'act_2',
      name: 'AI/ML Workshop',
      description: 'Attended a 3-day workshop on advanced machine learning concepts.',
      date: '2024-03-22',
      type: 'Workshop',
      status: 'approved',
      skills: ['Machine Learning', 'Python', 'Data Analysis'],
    },
    {
      id: 'act_3',
      name: 'Inter-College Basketball Tournament',
      description: 'Represented the university in the national level basketball tournament.',
      date: '2024-02-10',
      type: 'Sports',
      status: 'pending',
      skills: ['Teamwork', 'Discipline', 'Sportsmanship'],
    },
    {
      id: 'act_4',
      name: 'Summer Internship at TechCorp',
      description: 'Worked as a software engineering intern on the cloud services team.',
      date: '2023-08-30',
      type: 'Internship',
      status: 'approved',
      skills: ['Software Development', 'Cloud Computing', 'Agile Methodologies'],
    },
    {
      id: 'act_5',
      name: 'Project Management Certification',
      description: 'Completed an online certification course on project management fundamentals.',
      date: '2023-11-01',
      type: 'Certification',
      status: 'rejected',
      skills: ['Project Management', 'Planning', 'Risk Assessment'],
    },
     {
      id: 'act_6',
      name: 'University Codefest',
      description: 'Participated in a 24-hour coding competition, building a mobile app prototype.',
      date: '2023-09-20',
      type: 'Hackathon',
      status: 'approved',
      skills: ['Mobile Development', 'React Native', 'UI/UX Design'],
    },
  ],
};

export const allStudents: Student[] = [
  mockStudent,
  {
    id: 'S67890',
    name: 'John Smith',
    department: 'Electrical Engineering',
    year: 4,
    email: 'john.smith@university.edu',
    avatarUrl: 'https://picsum.photos/seed/3/200/200',
    activities: mockStudent.activities.filter(a => a.status === 'approved' && a.id.includes('2')),
  },
  {
    id: 'S54321',
    name: 'Emily White',
    department: 'Computer Science',
    year: 3,
    email: 'emily.white@university.edu',
    avatarUrl: 'https://picsum.photos/seed/4/200/200',
    activities: mockStudent.activities.filter(a => a.skills.includes('Leadership')),
  }
];

export const pendingActivities = allStudents.flatMap(s => s.activities.filter(a => a.status === 'pending').map(a => ({...a, studentName: s.name, studentId: s.id})));
