// Add your Supabase project URL and Anon Key here
const supabaseUrl = "https://yjkjjkeveanxpwitavwe.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqa2pqa2V2ZWFueHB3aXRhdndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3ODExMjksImV4cCI6MjA0MzM1NzEyOX0.ImS8xHn5Vog5zD34awTBdW4xWbbYwZ4vuuuJcqGEuQY"; // Replace with your Supabase Anon Key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const { user, error } = await supabase.auth.signIn({
    email: email,
    password: password
  });

  if (error) {
    document.getElementById("loginMessage").textContent = "Error: " + error.message;
  } else if (user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.role !== 'superuser') {
      document.getElementById("loginMessage").textContent = "Unauthorized: Superuser access required";
      await supabase.auth.signOut();
    } else {
      document.getElementById("loginMessage").textContent = "Login successful!";
      // You can redirect the user to a dashboard page if needed
    }
  }

});


