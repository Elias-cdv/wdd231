const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true, category: "WDD" },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true, category: "WDD" },
  { code: "WDD 231", name: "Web Frontend Development I", credits: 2, completed: false, category: "WDD" },
  { code: "CSE 110", name: "Introduction to Programming", credits: 2, completed: true, category: "CSE" },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true, category: "CSE" }
];

function renderCourses(filter = "All") {
  const container = document.getElementById('courses');
  container.innerHTML = '';
  let filtered = courses;
  if (filter === "WDD") filtered = courses.filter(c => c.category === "WDD");
  if (filter === "CSE") filtered = courses.filter(c => c.category === "CSE");

  filtered.forEach(course => {
    const div = document.createElement('div');
    div.textContent = `${course.code} - ${course.name}`;
    div.title = course.name;
    div.style.marginBottom = '8px';
    div.style.borderRadius = '5px';
    div.style.fontWeight = '600';
    div.style.padding = '8px 16px';
    if (course.completed) {
      div.style.background = 'var(--color-accent)';
      div.style.color = 'var(--color-header-footer)';
      div.innerHTML += ' <span style="font-size:0.9em; font-weight:400;">✔ Completed!</span>';
    } else {
      div.style.background = 'var(--color-header-footer)';
      div.style.color = 'var(--color-text)';
    }
    container.appendChild(div);
  });

  // Calcular créditos totales mostrados
  const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
  const creditsP = container.nextElementSibling;
  if (creditsP) {
    creditsP.textContent = `Total credits for courses listed above: ${totalCredits}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCourses();

  document.querySelectorAll('#filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      renderCourses(btn.textContent);
    });
  });
});