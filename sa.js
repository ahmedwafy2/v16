document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = submitBtn.querySelector('.submit-text');
    
    let isSubmitting = false;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        isSubmitting = true;
        submitBtn.disabled = true;
        submitText.textContent = 'Submitting...';
        
        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            major: form.major.value,
            year: form.year.value,
            experience: form.experience.value,
            motivation: form.motivation.value
        };
        
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxrbkBqyYc82P-976EXSkC-eAkJKe18or_BvOHaJLXssy-sLzggVU6rB8jYgdFT_pKs/exec';
        
        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Application submitted successfully!');
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('Error submitting form. Please try again.');
        } finally {
            isSubmitting = false;
            submitBtn.disabled = false;
            submitText.textContent = 'Submit Application';
        }
    });
});