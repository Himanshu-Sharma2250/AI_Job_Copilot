import React, { useState } from 'react'

const EmailOutput = ({email}) => {
    const emailText = email?.email || '';
    const linkedinMsg = email?.linkedin_message || '';
    
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedLinkedin, setCopiedLinkedin] = useState(false);

    const copyToClipboard = (text, setter) => {
        navigator.clipboard.writeText(text);
        setter(true);
        setTimeout(() => setter(false), 2000);
    }

    if (!emailText && !linkedinMsg) return null;

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Email Section */}
            {emailText && (
                <div className="bg-[#ff4d4d] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group w-full">
                    <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-4">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-black">EMAIL DRAFT</h2>
                        <button 
                            onClick={() => copyToClipboard(emailText, setCopiedEmail)}
                            className="bg-black cursor-pointer text-white px-4 py-2 font-bold uppercase hover:bg-white hover:text-black hover:outline hover:outline-4 hover:outline-black transition-colors"
                        >
                            {copiedEmail ? 'COPIED!' : 'COPY'}
                        </button>
                    </div>
                    <div className="bg-white border-4 border-black p-4 max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-sans text-lg font-medium text-black">
                            {emailText}
                        </pre>
                    </div>
                </div>
            )}

            {/* LinkedIn Section */}
            {linkedinMsg && (
                <div className="bg-[#00e5ff] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group w-full">
                    <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-4">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-black">LINKEDIN DM</h2>
                        <button 
                            onClick={() => copyToClipboard(linkedinMsg, setCopiedLinkedin)}
                            className="bg-black cursor-pointer text-white px-4 py-2 font-bold uppercase hover:bg-white hover:text-black hover:outline hover:outline-4 hover:outline-black transition-colors"
                        >
                            {copiedLinkedin ? 'COPIED!' : 'COPY'}
                        </button>
                    </div>
                    <div className="bg-white border-4 border-black p-4 max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-sans text-lg font-medium text-black">
                            {linkedinMsg}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmailOutput
