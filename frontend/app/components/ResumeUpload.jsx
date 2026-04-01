import React from 'react'

const ResumeUpload = () => {
    return (
        <div className=' flex flex-col justify-center items-center'>
            <label htmlFor="">
                Upload your Resume
            </label>

            <input type="file" name="resume" id="resume" accept='.pdf' className='border-2' />
        </div>
    )
}

export default ResumeUpload
