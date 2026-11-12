
// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL = "https://qpcsskiocfeeodunpcxa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_oiJHNFVdHWa-aATe_HWJoQ_RLB2m8BZ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// ==========================================
// PRIVACY FEEDBACK FORM
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("privacyFeedbackForm");
    const status = document.getElementById("feedbackStatus");
    const submitButton = form?.querySelector('button[type="submit"]');

    if (!form || !status || !submitButton) return;

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("feedbackName").value.trim();
        const email = document.getElementById("feedbackEmail").value.trim();
        const subject = document.getElementById("feedbackSubject").value.trim();
        const message = document.getElementById("feedbackMessage").value.trim();

        if (!name || !email || !subject || !message) {
            status.textContent = "Please complete all required fields.";
            status.style.color = "#dc3545";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        status.textContent = "Saving your feedback...";
        status.style.color = "#64748b";

        try {

            const { data, error } = await supabaseClient
                .from("privacy_feedback")
                .insert([
                    {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    }
                ])
                .select("id")
                .single();

            if (error) throw error;

            status.textContent =
                "Thank you! Your feedback has been successfully submitted.";

            status.style.color = "#00A878";

            form.reset();

        } catch (error) {

            console.error("Feedback submission error:", error);

            status.textContent =
                "Unable to submit your feedback. Please try again later.";

            status.style.color = "#dc3545";

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Feedback <span>→</span>';

        }

    });

});
