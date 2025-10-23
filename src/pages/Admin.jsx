import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const Admin = () => {
  const { user, login } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: '',
    technologies: [],
    projectUrl: '',
    githubUrl: '',
    demoEmbed: '',
    images: [],
    featured: false
  });
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState('add');
  
  // Import functionality state
  const [importData, setImportData] = useState({
    platform: 'sketchfab',
    url: '',
    category: '',
    featured: false
  });
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      fetchProjects();
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginData.username, loginData.password);
    if (result.success) {
      setIsLoggedIn(true);
    } else {
      alert(result.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/projects', newProject, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewProject({
        title: '',
        description: '',
        category: '',
        technologies: [],
        projectUrl: '',
        githubUrl: '',
        demoEmbed: '',
        images: [],
        featured: false
      });
      fetchProjects();
      alert('🎉 Project added successfully!');
    } catch (error) {
      alert('❌ Error adding project');
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, editingProject, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingProject(null);
      fetchProjects();
      alert('✅ Project updated successfully!');
    } catch (error) {
      alert('❌ Error updating project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProjects();
        alert('🗑️ Project deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting project');
      }
    }
  };

  // Import project function
  const handleImportProject = async (e) => {
    e.preventDefault();
    setImporting(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/import/${importData.platform}`,
        {
          [`${importData.platform}Url`]: importData.url,
          category: importData.category,
          featured: importData.featured
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (res.data.success) {
        alert('✅ Project imported successfully!');
        setImportData({
          platform: 'sketchfab',
          url: '',
          category: '',
          featured: false
        });
        fetchProjects();
        setActiveTab('manage');
      }
    } catch (error) {
      alert(error.response?.data?.message || '❌ Failed to import project');
    } finally {
      setImporting(false);
    }
  };

  const startEdit = (project) => {
    setEditingProject(project);
    setActiveTab('edit');
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setActiveTab('add');
  };

  // Project categories for dropdown
  const categories = [
    '3D Modeling',
    '3D Animation', 
    'Architectural Visualization',
    'Product Design',
    'Character Modeling',
    'Motion Graphics',
    'VFX',
    'Game Assets'
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-6 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="glass-effect p-8 rounded-2xl max-w-md w-full border border-slate-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Admin Portal</h2>
            <p className="text-gray-400">Access your portfolio dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-slate-800 rounded-lg text-center">
            <p className="text-sm text-gray-400">
              Default credentials: <br />
              <span className="text-blue-400">sakthi / sakthi@123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your 3D portfolio projects</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Welcome back,</p>
            <p className="text-lg font-semibold text-blue-400">{user?.username}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => { setActiveTab('add'); setEditingProject(null); }}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'add' 
                ? 'text-blue-400 border-blue-400' 
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            ➕ Add Project
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'import' 
                ? 'text-blue-400 border-blue-400' 
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            📥 Import Project
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'manage' 
                ? 'text-blue-400 border-blue-400' 
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            📋 Manage Projects
          </button>
          {editingProject && (
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'edit' 
                  ? 'text-yellow-400 border-yellow-400' 
                  : 'text-yellow-400 border-transparent'
              }`}
            >
              ✏️ Editing: {editingProject.title}
            </button>
          )}
        </div>

        {/* Add/Edit Project Form */}
        {(activeTab === 'add' || activeTab === 'edit') && (
          <div className="glass-effect p-8 rounded-2xl mb-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={editingProject ? handleUpdateProject : handleAddProject}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Project Title *</label>
                  <input
                    type="text"
                    value={editingProject ? editingProject.title : newProject.title}
                    onChange={(e) => editingProject 
                      ? setEditingProject({...editingProject, title: e.target.value})
                      : setNewProject({...newProject, title: e.target.value})
                    }
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="e.g., Modern Villa 3D Model"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Category *</label>
                  <select
                    value={editingProject ? editingProject.category : newProject.category}
                    onChange={(e) => editingProject 
                      ? setEditingProject({...editingProject, category: e.target.value})
                      : setNewProject({...newProject, category: e.target.value})
                    }
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Project URL */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Project URL</label>
                  <input
                    type="url"
                    value={editingProject ? editingProject.projectUrl : newProject.projectUrl}
                    onChange={(e) => editingProject 
                      ? setEditingProject({...editingProject, projectUrl: e.target.value})
                      : setNewProject({...newProject, projectUrl: e.target.value})
                    }
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="https://your-project.com"
                  />
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">GitHub URL</label>
                  <input
                    type="url"
                    value={editingProject ? editingProject.githubUrl : newProject.githubUrl}
                    onChange={(e) => editingProject 
                      ? setEditingProject({...editingProject, githubUrl: e.target.value})
                      : setNewProject({...newProject, githubUrl: e.target.value})
                    }
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="https://github.com/your-repo"
                  />
                </div>

                {/* Technologies */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Technologies Used *
                  </label>
                  <input
                    type="text"
                    value={editingProject ? editingProject.technologies.join(', ') : newProject.technologies.join(', ')}
                    onChange={(e) => {
                      const techArray = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                      editingProject 
                        ? setEditingProject({...editingProject, technologies: techArray})
                        : setNewProject({...newProject, technologies: techArray})
                    }}
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Blender, Maya, Substance Painter, Unity (comma separated)"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Separate technologies with commas</p>
                </div>

                {/* Demo Embed */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    3D Demo Embed Code
                  </label>
                  <textarea
                    value={editingProject ? editingProject.demoEmbed : newProject.demoEmbed}
                    onChange={(e) => editingProject 
                      ? setEditingProject({...editingProject, demoEmbed: e.target.value})
                      : setNewProject({...newProject, demoEmbed: e.target.value})
                    }
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Paste Sketchfab, Model Viewer, or custom embed code here"
                    rows="3"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    For 3D model previews - supports Sketchfab, Three.js, etc.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-300">Project Description *</label>
                <textarea
                  value={editingProject ? editingProject.description : newProject.description}
                  onChange={(e) => editingProject 
                    ? setEditingProject({...editingProject, description: e.target.value})
                    : setNewProject({...newProject, description: e.target.value})
                  }
                  className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                  rows="5"
                  placeholder="Describe your project, challenges faced, solutions implemented, and results achieved..."
                  required
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  checked={editingProject ? editingProject.featured : newProject.featured}
                  onChange={(e) => editingProject 
                    ? setEditingProject({...editingProject, featured: e.target.checked})
                    : setNewProject({...newProject, featured: e.target.checked})
                  }
                  className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500"
                  id="featured"
                />
                <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-300">
                  Mark as Featured Project
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    editingProject 
                      ? 'bg-yellow-600 hover:bg-yellow-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                
                {editingProject && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Import Project Section */}
        {activeTab === 'import' && (
          <div className="glass-effect p-8 rounded-2xl mb-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6">🚀 Import Projects</h2>
            
            <form onSubmit={handleImportProject} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Platform</label>
                  <select
                    value={importData.platform}
                    onChange={(e) => setImportData({...importData, platform: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="sketchfab">Sketchfab</option>
                    <option value="artstation">ArtStation</option>
                    <option value="behance">Behance</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
                  <select
                    value={importData.category}
                    onChange={(e) => setImportData({...importData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Project URL */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Project URL *
                  </label>
                  <input
                    type="url"
                    value={importData.url}
                    onChange={(e) => setImportData({...importData, url: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder={
                      importData.platform === 'sketchfab' 
                        ? 'https://sketchfab.com/3d-models/your-model-id' 
                        : importData.platform === 'artstation'
                        ? 'https://artstation.com/artwork/your-artwork-id'
                        : 'https://behance.net/gallery/your-project-id'
                    }
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Paste the full URL of your project from {importData.platform}
                  </p>
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={importData.featured}
                  onChange={(e) => setImportData({...importData, featured: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500"
                  id="importFeatured"
                />
                <label htmlFor="importFeatured" className="ml-2 text-sm font-medium text-gray-300">
                  Mark as Featured Project
                </label>
              </div>

              {/* Import Button */}
              <button
                type="submit"
                disabled={importing}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {importing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Importing...
                  </>
                ) : (
                  '📥 Import Project'
                )}
              </button>
            </form>

            {/* Platform Instructions */}
            <div className="mt-6 p-4 bg-slate-800 rounded-lg">
              <h4 className="font-semibold mb-3 text-blue-400">Supported Platforms:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-slate-700 p-3 rounded-lg">
                  <div className="font-semibold mb-1">🎮 Sketchfab</div>
                  <p className="text-gray-400 text-xs">3D models with interactive preview</p>
                </div>
                <div className="bg-slate-700 p-3 rounded-lg">
                  <div className="font-semibold mb-1">🎨 ArtStation</div>
                  <p className="text-gray-400 text-xs">Digital artwork and projects</p>
                </div>
                <div className="bg-slate-700 p-3 rounded-lg">
                  <div className="font-semibold mb-1">💼 Behance</div>
                  <p className="text-gray-400 text-xs">Design projects and portfolios</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manage Projects */}
        {activeTab === 'manage' && (
          <div className="glass-effect p-8 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Projects</h2>
              <div className="text-sm text-gray-400">
                Total Projects: <span className="text-blue-400 font-semibold">{projects.length}</span>
                {projects.filter(p => p.featured).length > 0 && (
                  <span className="ml-4">
                    Featured: <span className="text-yellow-400 font-semibold">{projects.filter(p => p.featured).length}</span>
                  </span>
                )}
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                <p className="text-gray-400">Start by adding or importing your first 3D project!</p>
                <button
                  onClick={() => setActiveTab('import')}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Import Project
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project._id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                        <div className="flex items-center gap-4 text-sm flex-wrap">
                          <span className="text-blue-400 font-medium">{project.category}</span>
                          {project.featured && (
                            <span className="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">
                              ⭐ Featured
                            </span>
                          )}
                          {project.importedFrom && (
                            <span className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs">
                              📥 {project.importedFrom}
                            </span>
                          )}
                          <span className="text-gray-400">
                            {project.technologies.slice(0, 3).join(', ')}
                            {project.technologies.length > 3 && '...'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(project)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex gap-4 text-sm">
                      {project.projectUrl && (
                        <a 
                          href={project.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          <span className="mr-1">🔗</span>
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-300 flex items-center"
                        >
                          <span className="mr-1">💻</span>
                          GitHub
                        </a>
                      )}
                      {project.demoEmbed && (
                        <span className="text-green-400 flex items-center">
                          <span className="mr-1">🎮</span>
                          3D Demo Ready
                        </span>
                      )}
                      {project.externalUrl && (
                        <a 
                          href={project.externalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 flex items-center"
                        >
                          <span className="mr-1">🌐</span>
                          Original Source
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;