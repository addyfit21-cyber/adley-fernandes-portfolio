const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

// McLaren replacements
content = content.replace(
  'Contract-based.<br/>Client-focused.',
  'Custom Automotive Art.'
);
content = content.replace(
  "This was a contract-based project for McLaren Mumbai. The primary objective was to create highly customised sketches tailored precisely to the client's specific needs and vision.",
  "Commissioned by McLaren Mumbai to create custom automotive sketches, capturing the precise vision and aesthetic of the brand."
);
content = content.replace(
  'Strict detailing.<br/>Commitment.',
  'Focus on details.'
);
content = content.replace(
  "My approach centered entirely on meticulous detailing and reliable delivery. I maintained a strong commitment to producing high-quality artwork that met the client's exact standards.",
  "I focused on delivering high-quality artwork with meticulous attention to detail, ensuring the final pieces met the client's exact standards."
);
content = content.replace(
  'Custom automotive sketches created on large A1 size charts.',
  'Custom automotive sketches on large A1 charts.'
);
content = content.replace(
  'Traditional sketching on A1 charts.',
  'Traditional hand-drawn sketching.'
);
content = content.replace(
  'Professional delivery.',
  'On time and on point.'
);
content = content.replace(
  "Successfully delivered detailed custom sketches on schedule, demonstrating professionalism, accuracy, and a strong commitment to the client's requirements.",
  "Delivered the detailed sketches on schedule, perfectly aligning with McLaren's requirements and vision."
);

// Porsche replacements
content = content.replace(
  'Contracted work.<br/>Tailored vision.',
  'Exclusive Commission.'
);
content = content.replace(
  "A contract-based commission for Porsche Mumbai. The project required customising automotive sketches to align perfectly with the client's specific requests and expectations.",
  "A special commission for Porsche Mumbai to create highly detailed, custom automotive artwork that reflects the brand's iconic design."
);
content = content.replace(
  'High detailing.<br/>Timely delivery.',
  'Precision and quality.'
);
content = content.replace(
  "I focused heavily on intricate detailing and professionalism. A strong commitment to deadlines and quality ensured the artwork met the high standards of the client.",
  "I prioritized intricate detailing and clean execution, making sure every line captured the essence of the vehicles."
);
content = content.replace(
  'Bespoke automotive sketches executed on large A1 size charts.',
  'Custom automotive sketches on large A1 charts.'
);
content = content.replace(
  'Traditional hand-drawn sketches on A1 charts.',
  'Traditional hand-drawn sketching.'
);
// Client satisfaction. is fine
content = content.replace(
  "The project was completed with a focus on timely delivery and precision, resulting in highly detailed A1 sketches that fulfilled the contract requirements.",
  "Successfully completed and delivered the bespoke A1 sketches, fully satisfying the client's expectations for both quality and timeline."
);

fs.writeFileSync(path, content);
console.log('Successfully simplified text in McLaren and Porsche sections');
