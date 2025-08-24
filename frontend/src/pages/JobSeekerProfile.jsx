import React, { useState } from 'react'
import {
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Upload,
  FileIcon,
  Trash2Icon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
} from 'lucide-react'
export function JobSeekerProfile() {
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [activeTab, setActiveTab] = useState('personal')
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'resume.pdf',
      type: 'application/pdf',
      size: '1.2 MB',
    },
    {
      id: 2,
      name: 'portfolio.pdf',
      type: 'application/pdf',
      size: '3.5 MB',
    },
    {
      id: 3,
      name: 'certificate.pdf',
      type: 'application/pdf',
      size: '0.8 MB',
    },
  ])
  const [skills, setSkills] = useState([
    'React',
    'JavaScript',
    'TypeScript',
    'HTML',
    'CSS',
    'UI/UX Design',
    'Node.js',
  ])
  const [newSkill, setNewSkill] = useState('')
  // Mock profile data
  const profile = {
    name: 'Alex Johnson',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    email: 'alex.johnson@example.com',
    about:
      'Passionate frontend developer with 5+ years of experience building responsive and accessible web applications. Specialized in React and modern JavaScript frameworks.',
    experience: [
      {
        id: 1,
        company: 'Tech Solutions Inc.',
        position: 'Senior Frontend Developer',
        duration: '2020 - Present',
        description:
          'Lead developer for multiple client projects, mentoring junior developers, and implementing best practices.',
      },
      {
        id: 2,
        company: 'WebDev Studio',
        position: 'Frontend Developer',
        duration: '2018 - 2020',
        description:
          'Developed and maintained client websites using React, Redux, and modern CSS.',
      },
    ],
    education: [
      {
        id: 1,
        institution: 'University of California, Berkeley',
        degree: 'BS in Computer Science',
        duration: '2014 - 2018',
      },
    ],
  }
  const handleFileUpload = (event) => {
    const files = event.target.files
    if (files.length > 0) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: uploadedFiles.length + index + 1,
        name: file.name,
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }
  const handleDeleteFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }
  const toggleProfileVisibility = () => {
    setProfileVisibility(!profileVisibility)
  }
  const handleAddSkill = (e) => {
    e.preventDefault()
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Complete your profile to increase your chances of finding the right
            job
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleProfileVisibility}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${profileVisibility ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
          >
            {profileVisibility ? (
              <>
                <EyeIcon className="w-4 h-4 mr-2" />
                Public
              </>
            ) : (
              <>
                <EyeOffIcon className="w-4 h-4 mr-2" />
                Private
              </>
            )}
          </button>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('personal')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'experience' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'skills' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'portfolio' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Portfolio & Documents
          </button>
        </nav>
      </div>
      <div className="px-4 py-5 sm:p-6">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <User size={40} />
                </div>
              </div>
              <div className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={profile.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={profile.title}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={profile.email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={profile.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={profile.location}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                About
              </label>
              <textarea
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                defaultValue={profile.about}
              />
              <p className="mt-2 text-sm text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
          </div>
        )}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Work Experience
            </h3>
            {profile.experience.map((exp) => (
              <div
                key={exp.id}
                className="border border-gray-200 rounded-md p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-md font-medium">{exp.position}</h4>
                    <div className="text-sm text-gray-500">{exp.company}</div>
                    <div className="text-sm text-gray-500">{exp.duration}</div>
                  </div>
                  <div>
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {exp.description}
                </div>
              </div>
            ))}
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <PlusIcon className="w-4 h-4 mr-1" />
              Add Experience
            </button>
            <h3 className="text-lg font-medium text-gray-900 pt-4">
              Education
            </h3>
            {profile.education.map((edu) => (
              <div
                key={edu.id}
                className="border border-gray-200 rounded-md p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-md font-medium">{edu.degree}</h4>
                    <div className="text-sm text-gray-500">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-gray-500">{edu.duration}</div>
                  </div>
                  <div>
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <PlusIcon className="w-4 h-4 mr-1" />
              Add Education
            </button>
          </div>
        )}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Skills</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add your technical and professional skills
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddSkill} className="mt-4 flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Portfolio & Documents
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload your resume, portfolio, certificates, and other relevant
                documents
              </p>
              <div className="mt-4 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <div className="text-gray-500 flex flex-col items-center text-center">
                  <Upload className="h-10 w-10 mb-3" />
                  <p className="text-sm">
                    <span className="font-medium">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs mt-1">
                    PDF, DOC, DOCX, PNG, JPG up to 10MB
                  </p>
                </div>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  Upload files
                </label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900">
                    Uploaded files
                  </h4>
                  <ul className="mt-3 divide-y divide-gray-200 border border-gray-200 rounded-md">
                    {uploadedFiles.map((file) => (
                      <li
                        key={file.id}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="w-0 flex-1 flex items-center">
                          <FileIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                          <span className="ml-2 flex-1 w-0 truncate">
                            {file.name}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                          <span className="text-gray-500">{file.size}</span>
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  )
}
