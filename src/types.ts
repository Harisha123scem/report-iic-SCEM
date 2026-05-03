export interface IICReportData {
  // Session Details
  title: string;
  date: string;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  venue: string;
  category: 'IIC Calendar Activity' | 'MIC Driven Activity' | 'Self Driven Activity' | 'Celebration Activity';
  objective: string;
  ledBy: 'Institute Council' | 'Student Council';
  theme: 'Innovation' | 'Entrepreneurship' | 'IPR' | 'Startup';

  // Expert Details
  expertName: string;
  expertDesignation: string;
  expertOrg: string;
  expertBrief: string;

  // Description
  description: string;

  // Participant Details
  studentCount: number;
  staffCount: number;
  externalCount: number;

  // Highlights & Outcome
  highlights: string[];
  outcome: string;
  feedback: string[];

  // Organizing Team
  teamDetails: string;

  // Evidence (Base64 strings for images)
  photos: string[];
  mediaScreenshots: string[];
  attendanceProof: string | null;
  multimediaLink: string;
  coordinatorName: string;
  collegeLogo: string | null;
  iicLogo: string | null;
  feedbackSummary: string;
  socialLinks: {
    linkedin: string;
    instagram: string;
    x: string;
    facebook: string;
    other: string;
  };
  // New Fields
  academicYear: string;
  quarter: string;
  deptIicCoordinator: string;
  hodName: string;
  bannerImage: string | null;
  attendanceLink: string;
  organizingDept: string;
  poMapped: string[];
  psoMapped: string[];
}

export const INITIAL_REPORT_DATA: IICReportData = {
  title: '',
  date: '',
  duration: '',
  mode: 'Offline',
  venue: '',
  category: 'IIC Calendar Activity',
  objective: '',
  ledBy: 'Institute Council',
  theme: 'Innovation',
  organizingDept: '',
  poMapped: [],
  psoMapped: [],
  expertName: '',
  expertDesignation: '',
  expertOrg: '',
  expertBrief: '',
  description: '',
  studentCount: 0,
  staffCount: 0,
  externalCount: 0,
  highlights: [''],
  outcome: '',
  feedback: ['', ''],
  teamDetails: '',
  photos: ['', '', '', ''],
  mediaScreenshots: [],
  attendanceProof: null,
  multimediaLink: '',
  coordinatorName: '',
  collegeLogo: '/input_file_1.png',
  iicLogo: '/input_file_0.png',
  feedbackSummary: '',
  socialLinks: {
    linkedin: '',
    instagram: '',
    x: '',
    facebook: '',
    other: '',
  },
  academicYear: '2025-26',
  quarter: 'Q1',
  deptIicCoordinator: '',
  hodName: '',
  bannerImage: null,
  attendanceLink: '',
};
