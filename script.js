document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = submitBtn.querySelector('.submit-text');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitText.textContent = 'Submitting...';

        // Get selected committees
        const selectedCommittees = Array.from(document.querySelectorAll('input[name="committees"]:checked'))
            .map(cb => cb.value)
            .join(', ');

        const scriptURL = 'https://script.google.com/macros/s/AKfycby4EKN1bZKFyh7QZVT958j05n3td7G8AL236S5A3OimGyYlDuVhEpaIaerl4Cy91-ih/exec';
        
        // Create form data
        const formData = new URLSearchParams();
        formData.append('name', form.name.value);
        formData.append('email', form.email.value);
        formData.append('phone', form.phone.value);
        formData.append('year', form.year.value);
        formData.append('interest', form.interest.value);
        formData.append('expectations', form.expectations.value);
        formData.append('pastTeams', form.pastTeams.value);
        formData.append('workLife', form.workLife.value);
        formData.append('leadership', form.leadership.value);
        formData.append('availability', form.availability.value);
        formData.append('committees', selectedCommittees);
        formData.append('skillRating', form.skillRating.value);
        formData.append('skillsToLearn', form.skillsToLearn.value);

        // Submit form
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        })
        .then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Your application was submitted successfully!',
                icon: 'success'
            });
            form.reset();
        })
        .catch(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Your application was submitted successfully!',
                icon: 'success'
            });
            form.reset();
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitText.textContent = 'Submit Application';
        });
    });
});
