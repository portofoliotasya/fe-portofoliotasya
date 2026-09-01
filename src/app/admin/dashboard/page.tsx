"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  LogOut,
  Upload,
  FolderKanban,
  Mail,
  Loader2,
  AlertTriangle,
  X,
  Check,
} from "lucide-react";
import { authService, projectService, mediaService, inquiryService } from "@/services";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { Badge } from "@/components/ui";
import type { Project, ProjectInput, Inquiry } from "@/types/api";

function AdminDashboardContent() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"projects" | "inquiries">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [challenges, setChallenges] = useState("");
  const [role, setRole] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [projectsData, inquiriesData] = await Promise.allSettled([
        projectService.getAll(),
        inquiryService.getAll(),
      ]);

      if (projectsData.status === "fulfilled") {
        setProjects(projectsData.value);
      }
      if (inquiriesData.status === "fulfilled") {
        setInquiries(inquiriesData.value);
      }
    } catch {
      showToast("Could not load latest data from backend.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setGoal("");
    setChallenges("");
    setRole("");
    setTechStackInput("");
    setThumbnail("/images/project_fintech.jpg");
    setDemoUrl("");
    setRepoUrl("");
    setIsFormModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setGoal(project.goal || "");
    setChallenges(project.challenges || "");
    setRole(project.role || "");
    setTechStackInput(
      Array.isArray(project.techStack) ? project.techStack.join(", ") : ""
    );
    setThumbnail(project.thumbnail);
    setDemoUrl(project.demoUrl || "");
    setRepoUrl(project.repoUrl || "");
    setIsFormModalOpen(true);
  };

  // Handle file selection and media upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedUrl = await mediaService.upload(file);
      setThumbnail(uploadedUrl);
      showToast("Media uploaded successfully!", "success");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Media upload failed",
        "error"
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Project Form Submit (Create or Update)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !thumbnail) {
      showToast("Please fill in Title, Description, and Thumbnail", "error");
      return;
    }

    const techStack = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const projectData: ProjectInput = {
      title,
      description,
      goal: goal || undefined,
      challenges: challenges || undefined,
      role: role || undefined,
      thumbnail,
      techStack: techStack.length > 0 ? techStack : ["UI/UX"],
      demoUrl: demoUrl || undefined,
      repoUrl: repoUrl || undefined,
    };

    setIsSubmitting(true);
    try {
      if (editingProject) {
        // Update
        const updated = await projectService.update(
          editingProject.id,
          projectData
        );
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? { ...p, ...updated } : p))
        );
        showToast("Project updated successfully!", "success");
      } else {
        // Create
        const created = await projectService.create(projectData);
        setProjects((prev) => [created, ...prev]);
        showToast("Project created successfully!", "success");
      }
      setIsFormModalOpen(false);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to save project",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Delete Confirmation Modal
  const handleOpenDeleteModal = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  // Confirm Soft Delete
  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    setIsSubmitting(true);
    try {
      await projectService.delete(projectToDelete.id);
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      showToast("Project deleted successfully.", "success");
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to delete project",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-subtle flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-border-soft sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-2xl font-bold text-deep-rose tracking-tight"
              >
                Tasya
              </Link>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-badge-bg text-deep-rose">
                CMS Admin
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-dark-slate hover:text-deep-rose border border-border-soft rounded-lg hover:bg-bg-subtle transition-colors"
              >
                <span>View Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => authService.logout()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-light-pink flex items-center justify-center text-deep-rose">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-slate">Total Projects</p>
              <p className="text-2xl font-bold text-dark-slate">
                {projects.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-slate">
                Inquiries Received
              </p>
              <p className="text-2xl font-bold text-dark-slate">
                {inquiries.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border-soft shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-slate">Backend Server</p>
              <p className="text-sm font-semibold text-emerald-600">Connected</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-border-soft mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("projects")}
              className={`
                pb-3 px-1 text-sm font-semibold transition-colors cursor-pointer relative
                ${
                  activeTab === "projects"
                    ? "text-deep-rose border-b-2 border-deep-rose"
                    : "text-muted-slate hover:text-dark-slate"
                }
              `}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`
                pb-3 px-1 text-sm font-semibold transition-colors cursor-pointer relative
                ${
                  activeTab === "inquiries"
                    ? "text-deep-rose border-b-2 border-deep-rose"
                    : "text-muted-slate hover:text-dark-slate"
                }
              `}
            >
              Inquiries Inbox ({inquiries.length})
            </button>
          </div>

          {activeTab === "projects" && (
            <button
              onClick={handleOpenCreateModal}
              className="
                inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white
                bg-plum hover:bg-deep-rose rounded-xl shadow-sm
                transition-all duration-200 active:scale-[0.98] cursor-pointer
              "
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          )}
        </div>

        {/* Tab 1: Projects Table */}
        {activeTab === "projects" && (
          <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center text-muted-slate flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading projects...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center text-muted-slate">
                <p>No projects found. Click &quot;Add Project&quot; to create your first portfolio case study.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-dark-slate">
                  <thead className="bg-bg-subtle/80 text-xs font-semibold text-muted-slate uppercase tracking-wider border-b border-border-soft">
                    <tr>
                      <th className="px-6 py-3.5">Thumbnail</th>
                      <th className="px-6 py-3.5">Title</th>
                      <th className="px-6 py-3.5">Tech Stack</th>
                      <th className="px-6 py-3.5">Links</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-soft">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-bg-subtle/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-bg-subtle border border-border-soft">
                            <Image
                              src={project.thumbnail}
                              alt={project.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-dark-slate">{project.title}</p>
                          <p className="text-xs text-muted-slate line-clamp-1 max-w-xs">
                            {project.description}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="default" className="text-[10px] px-2 py-0.5">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs space-y-1">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-deep-rose hover:underline block truncate max-w-[140px]"
                            >
                              Demo URL ↗
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-slate hover:underline block truncate max-w-[140px]"
                            >
                              GitHub ↗
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(project)}
                              className="p-1.5 text-muted-slate hover:text-deep-rose hover:bg-light-pink rounded-lg transition-colors cursor-pointer"
                              aria-label="Edit project"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(project)}
                              className="p-1.5 text-muted-slate hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              aria-label="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Inquiries Inbox */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-2xl border border-border-soft shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center text-muted-slate flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading inquiries...</span>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-12 text-center text-muted-slate">
                <p>No client inquiries received yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-dark-slate">
                  <thead className="bg-bg-subtle/80 text-xs font-semibold text-muted-slate uppercase tracking-wider border-b border-border-soft">
                    <tr>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Client</th>
                      <th className="px-6 py-3.5">Type & Budget</th>
                      <th className="px-6 py-3.5">Project Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-soft">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-bg-subtle/40 transition-colors">
                        <td className="px-6 py-4 text-xs text-muted-slate whitespace-nowrap">
                          {new Date(inq.createdAt).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-dark-slate">{inq.name}</p>
                          <a href={`mailto:${inq.email}`} className="text-xs text-deep-rose hover:underline block">
                            {inq.email}
                          </a>
                          {inq.whatsapp && (
                            <p className="text-xs text-muted-slate">WA: {inq.whatsapp}</p>
                          )}
                          {inq.company && (
                            <p className="text-xs text-muted-slate">Co: {inq.company}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="text-xs block mb-1 w-fit">
                            {inq.projectType}
                          </Badge>
                          <span className="text-xs text-muted-slate">{inq.budgetRange}</span>
                        </td>
                        <td className="px-6 py-4 max-w-sm">
                          <p className="text-xs text-dark-slate line-clamp-3">{inq.description}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Project Form Modal (Create / Edit) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border-soft p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-border-soft mb-6">
              <h2 className="text-xl font-bold text-dark-slate">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="text-muted-slate hover:text-dark-slate p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Media Upload / Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-dark-slate mb-2">
                  Project Thumbnail / Media
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-bg-subtle border border-border-soft flex-shrink-0">
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-muted-slate">
                        No image
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-dark-slate bg-bg-subtle border border-border-soft rounded-xl hover:bg-border-lighter transition-colors cursor-pointer"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading to server...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image (Max 5MB)</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-muted-slate mt-1">
                      JPG, PNG, or WebP. Directly uploaded via /api/media/upload.
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-dark-slate mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Aura Wellness App"
                  className="w-full px-4 py-2 text-sm border border-border-soft rounded-xl focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-dark-slate mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A concise summary of the project."
                  className="w-full px-4 py-2 text-sm border border-border-soft rounded-xl focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent outline-none resize-none"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-dark-slate mb-1">
                  Tech Stack (Comma Separated) *
                </label>
                <input
                  type="text"
                  required
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="Figma, React Native, Tailwind"
                  className="w-full px-4 py-2 text-sm border border-border-soft rounded-xl focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent outline-none"
                />
              </div>

              {/* Goal & Challenges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-slate mb-1">
                    The Goal
                  </label>
                  <textarea
                    rows={3}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="The primary objective..."
                    className="w-full px-4 py-2 text-sm border border-border-soft rounded-xl focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-slate mb-1">
                    Challenges
                  </label>
                  <textarea
                    rows={3}
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    placeholder="Key hurdles overcome..."
                    className="w-full px-4 py-2 text-sm border border-border-soft rounded-xl focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent outline-none resize-none"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-dark-slate mb-1">
                  My Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Lead UI/UX Designer"
                  className="w-full px-4 py-2 text-sm border border-border-soft rounded-xl focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent outline-none"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-slate mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2 text-sm border border-border-soft rounded-xl focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-slate mb-1">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2 text-sm border border-border-soft rounded-xl focus:ring-2 focus:ring-rose-accent/30 focus:border-rose-accent outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border-soft">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-muted-slate hover:text-dark-slate rounded-xl hover:bg-bg-subtle transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-plum hover:bg-deep-rose rounded-xl shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Soft Delete Confirmation Modal */}
      {isDeleteModalOpen && projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-border-soft p-6 sm:p-8">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-dark-slate">Delete Project</h3>
            </div>

            <p className="text-sm text-muted-slate mb-6">
              Are you sure you want to soft-delete <strong>&quot;{projectToDelete.title}&quot;</strong>? This project will be hidden from the public portfolio.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-muted-slate hover:text-dark-slate rounded-xl hover:bg-bg-subtle transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ToastProvider>
      <AdminDashboardContent />
    </ToastProvider>
  );
}
