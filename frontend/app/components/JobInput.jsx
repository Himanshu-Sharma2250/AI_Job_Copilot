import React from 'react'

const JobInput = () => {
    return (
        <div className='flex flex-col gap-4 justify-center'>
            <label htmlFor="">Job Description</label>

            <textarea name="jd" id="jd" placeholder='Enter Job Description' className='border-2 rounded-xl px-2 h-40 '></textarea>
        </div>
    )
}

export default JobInput
