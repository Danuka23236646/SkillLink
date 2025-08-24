import React, { useState } from 'react'
import {
  Search,
  MapPin,
  Filter,
  MessageSquareIcon,
  PhoneIcon,
  MailIcon,
  BookmarkIcon,
  UserIcon,
  BriefcaseIcon,
} from 'lucide-react'
export function TalentSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [savedCandidates, setSavedCandidates] = useState([2, 5])
  // Filter states
  const [experienceLevel, setExperienceLevel] = useState('')
  const [availability, setAvailability] = useState('')
  const [skills, setSkills] = useState([])
  // Mock candidate data
  const candidates = [
    {
      id: 1,
      name: 'Alex Johnson',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      experience: '5+ years',
      skills: [
        'React',
        'JavaScript',
        'TypeScript',
        'HTML',
        'CSS',
        'UI/UX Design',
      ],
      availability: 'Immediately',
      photo:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      title: 'UX/UI Designer',
      location: 'Remote',
      experience: '4 years',
      skills: [
        'Figma',
        'Adobe XD',
        'UI Design',
        'User Research',
        'Prototyping',
      ],
      availability: '2 weeks',
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'Backend Developer',
      location: 'New York, NY',
      experience: '7 years',
      skills: ['Node.js', 'Python', 'MongoDB', 'Express', 'API Design'],
      availability: '1 month',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 4,
      name: 'Jessica Rodriguez',
      title: 'Product Manager',
      location: 'Austin, TX',
      experience: '6 years',
      skills: [
        'Product Strategy',
        'Agile',
        'User Stories',
        'Roadmapping',
        'Analytics',
      ],
      availability: 'Immediately',
      photo:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 5,
      name: 'David Kim',
      title: 'DevOps Engineer',
      location: 'Remote',
      experience: '3 years',
      skills: [
        'AWS',
        'Docker',
        'Kubernetes',
        'CI/CD',
        'Infrastructure as Code',
      ],
      availability: '2 weeks',
      photo:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      name: 'Emily Davis',
      title: 'Mobile Developer (iOS)',
      location: 'Seattle, WA',
      experience: '4 years',
      skills: ['Swift', 'iOS', 'Objective-C', 'Mobile Design', 'App Store'],
      availability: '1 month',
      photo:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]
  const toggleSaveCandidate = (candidateId) => {
    if (savedCandidates.includes(candidateId)) {
      setSavedCandidates(savedCandidates.filter((id) => id !== candidateId))
    } else {
      setSavedCandidates([...savedCandidates, candidateId])
    }
  }
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }
  const resetFilters = () => {
    setExperienceLevel('')
    setAvailability('')
    setSkills([])
  }
  const handleSkillChange = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill))
    } else {
      setSkills([...skills, skill])
    }
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Find Top Talent
          </h1>
          <p className="text-gray-500 mb-6">
            Search for qualified candidates to join your team
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Job title, skills, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md shadow-sm text-sm font-medium flex items-center justify-center">
              Search Talent
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-64 bg-white shadow-sm rounded-lg overflow-hidden h-fit">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center md:hidden">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              onClick={toggleFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div
            className={`p-4 space-y-6 ${filtersOpen ? 'block' : 'hidden md:block'}`}
          >
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Experience Level
              </h3>
              <div className="space-y-2">
                {[
                  'Entry Level (0-2 years)',
                  'Mid Level (3-5 years)',
                  'Senior Level (5-8 years)',
                  'Expert (8+ years)',
                ].map((level) => (
                  <div key={level} className="flex items-center">
                    <input
                      id={`experience-${level}`}
                      name="experience"
                      type="radio"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={experienceLevel === level}
                      onChange={() => setExperienceLevel(level)}
                    />
                    <label
                      htmlFor={`experience-${level}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Availability
              </h3>
              <div className="space-y-2">
                {[
                  'Immediately',
                  '1-2 weeks',
                  '1 month',
                  'More than 1 month',
                ].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      id={`availability-${option}`}
                      name="availability"
                      type="radio"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      checked={availability === option}
                      onChange={() => setAvailability(option)}
                    />
                    <label
                      htmlFor={`availability-${option}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Skills</h3>
              <div className="space-y-2">
                {[
                  'JavaScript',
                  'React',
                  'Python',
                  'UI/UX Design',
                  'Node.js',
                  'AWS',
                  'Product Management',
                ].map((skill) => (
                  <div key={skill} className="flex items-center">
                    <input
                      id={`skill-${skill}`}
                      name={`skill-${skill}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    <label
                      htmlFor={`skill-${skill}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={resetFilters}
              className="w-full py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Filters
            </button>
          </div>
        </div>
        {/* Candidate listings */}
        <div className="flex-1">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {candidates.length} Candidates Available
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <select className="text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Most Relevant</option>
                  <option>Recently Active</option>
                  <option>Experience (High to Low)</option>
                  <option>Experience (Low to High)</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={candidate.photo}
                          alt={candidate.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {candidate.name}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {candidate.title}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {candidate.location}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaveCandidate(candidate.id)}
                      className={`h-8 w-8 flex items-center justify-center rounded-full ${savedCandidates.includes(candidate.id) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-500 bg-white'}`}
                    >
                      <BookmarkIcon
                        className="h-5 w-5"
                        fill={
                          savedCandidates.includes(candidate.id)
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <BriefcaseIcon className="h-4 w-4 mr-1" />
                      <span>{candidate.experience} experience</span>
                      <span className="mx-2">&middot;</span>
                      <span>Available {candidate.availability}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {candidate.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{candidate.skills.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <UserIcon className="h-4 w-4 mr-1" />
                      View Profile
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <MessageSquareIcon className="h-4 w-4 mr-1" />
                      Contact
                    </button>
                    <button className="inline-flex items-center px-2 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <PhoneIcon className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center px-2 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <MailIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{candidates.length}</span> of{' '}
                <span className="font-medium">56</span> results
              </div>
              <div className="flex-1 flex justify-end">
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
