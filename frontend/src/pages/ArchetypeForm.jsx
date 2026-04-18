import { useForm } from "react-hook-form"
import { useOnBoarding } from "../queries/AI_services";
import { states } from "../store/globalStates";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const ArchetypeForm = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            degree: "",
            experience_level: "",
            strengths_list: [],
            best_project: "",
            target_roles_list: [],
            tech_stack: []
        }
    });
    
    const onBoardingMutation = useOnBoarding();
    const { setArchetype } = states();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (data) => {
        setLoading(true);
        try {
            const success = await onBoardingMutation.mutateAsync(data);
            setArchetype(success.data);
            navigate({ to: "/" });
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setLoading(false)
        }
    }

    // Input styling variable to keep the JSX clean
    const inputStyle = "w-full border-4 border-black p-3 text-black focus:outline-none focus:bg-neo-lime transition-colors font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1";

    return (
        <div className="min-h-screen bg-[--background] py-16 px-6 flex flex-col items-center selection:bg-neo-lime selection:text-black">
            <div className="max-w-4xl w-full">
                {/* Header Section */}
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-center border-b-8 border-black pb-4">
                    Identity <span className="bg-black text-neo-lime px-4 py-1 rotate-1 inline-block shadow-[6px_6px_0px_0px_rgba(255,0,234,1)]">ARCHETYPE</span>
                </h1>

                <form 
                    onSubmit={handleSubmit(submitForm)}
                    className="bg-white border-4 border-black p-8 md:p-12 shadow-brutal flex flex-col gap-8 w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Degree */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black uppercase italic tracking-tight">1. Degree / Education</label>
                            <input 
                                type="text" 
                                placeholder="e.g. BTech Computer Science"
                                className={inputStyle}
                                {...register("degree")}
                                required
                            />
                        </div>

                        {/* Experience Level */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black uppercase italic tracking-tight">2. Experience Level</label>
                            <select 
                                className={inputStyle}
                                {...register("experience_level")}
                                required
                            >
                                <option value="" disabled>SELECT LEVEL</option>
                                <option value="Fresher">FRESHER (0-1 YRS)</option>
                                <option value="Junior">JUNIOR (1-3 YRS)</option>
                                <option value="Mid-Level">MID-LEVEL (3-5 YRS)</option>
                                <option value="Senior">SENIOR (5+ YRS)</option>
                            </select>
                        </div>
                    </div>

                    {/* Strengths */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xl text-black uppercase italic tracking-tight">3. Core Strengths</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Problem Solving, System Design"
                            className={inputStyle}
                            {...register("strengths_list")}
                            required
                        />
                    </div>

                    {/* Best Project */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xl text-black uppercase italic tracking-tight">4. Featured Project</label>
                        <input 
                            type="text" 
                            placeholder="NAME OF YOUR BEST WORK"
                            className={inputStyle}
                            {...register("best_project")}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Target Roles */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black uppercase italic tracking-tight">5. Target Roles</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Frontend Engineer, Full-stack Developer"
                                className={inputStyle}
                                {...register("target_roles_list")}
                                required
                            />
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xl text-black uppercase italic tracking-tight">6. Tech Stack</label>
                            <input 
                                type="text" 
                                placeholder="MERN, Next.js, AWS..."
                                className={inputStyle}
                                {...register("tech_stack")}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="mt-4 border-4 text-black border-black bg-lime-400 disabled:bg-lime-800 px-8 py-5 text-3xl font-black uppercase tracking-widest shadow-brutal hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-brutal-hover transition-all"
                    >
                        🚀 SAVE ARCHETYPE
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ArchetypeForm