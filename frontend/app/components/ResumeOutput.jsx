import { states } from "@/app/state"
import Markdown from "react-markdown";
import ResumeTemplate from "@/app/components/resume-templates/ResumeTemplate";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeOutput = () => {
    const { result } = states();
    const resumeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleDownloadPdf = async () => {
        if (!resumeRef.current) return;
        
        try {
            const canvas = await html2canvas(resumeRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }
            
            pdf.save("resume.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const handleDownloadLatex = () => {
        let latexCode = "";
        
        if (result.latex) {
            latexCode = result.latex;
        } else if (result.resume && typeof result.resume === 'object') {
            const data = result.resume;
            const escapeLatex = (str) => typeof str === 'string' ? str.replace(/&/g, '\\&').replace(/%/g, '\\%').replace(/\$/g, '\\$').replace(/#/g, '\\#').replace(/_/g, '\\_').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/~/g, '\\textasciitilde{}').replace(/\^/g, '\\textasciicircum{}') : str;

            latexCode = `\\documentclass{article}
\\usepackage[margin=1in]{geometry}
\\begin{document}
\\title{\\textbf{${escapeLatex(data.name) || 'Resume'}}}
\\date{}
\\maketitle

\\section*{Summary}
${escapeLatex(data.summary) || ''}

\\section*{Skills}
\\begin{itemize}
${(data.skills || []).map(s => `\\item ${escapeLatex(s)}`).join('\n')}
\\end{itemize}

\\section*{Experience}
${(data.experience || []).map(exp => `\\subsection*{${escapeLatex(exp.role)} at ${escapeLatex(exp.company)}}
\\begin{itemize}
${(exp.points || []).map(p => `\\item ${escapeLatex(p)}`).join('\n')}
\\end{itemize}`).join('\n')}

\\section*{Projects}
${(data.projects || []).map(proj => `\\subsection*{${escapeLatex(proj.name)}}
\\begin{itemize}
${(proj.points || []).map(p => `\\item ${escapeLatex(p)}`).join('\n')}
\\end{itemize}`).join('\n')}

\\end{document}`;
        } else if (resumeRef.current) {
            latexCode = resumeRef.current.innerText;
        }

        const blob = new Blob([latexCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.tex';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    if (!result || !result.resume) return null;

    return (
        <div className="bg-white border-4 border-black shadow-brutal flex flex-col w-full h-full relative">
            <div className="bg-neo-pink border-b-4 border-black p-4 flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase text-black tracking-widest">
                    TAILORED RESUME
                </h3>
                <div className="flex gap-2">
                    <button
                        className="bg-white border-2 border-black px-4 py-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                        onClick={handleDownloadPdf}
                    >
                        Download PDF
                    </button>
                    <button
                        className="bg-white border-2 border-black px-4 py-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                        onClick={handleDownloadLatex}
                    >
                        Download LaTeX
                    </button>
                    <button
                        className="bg-white border-2 border-black px-4 py-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase w-32"
                        onClick={() => {
                            if (resumeRef.current) {
                                navigator.clipboard.writeText(resumeRef.current.innerText);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }
                        }}
                    >
                        {copied ? "Copied!" : "Copy Text"}
                    </button>
                </div>
            </div>

            <div className="p-8 whitespace-pre-wrap font-mono text-lg leading-relaxed text-black max-h-[600px] overflow-y-auto">
                <div ref={resumeRef}>
                    <ResumeTemplate data={result.resume} />
                </div>
            </div>
        </div>
    )
}

export default ResumeOutput
