const fs = require('fs');
const path = require('path');

// Comprehensive mapping of all teams to their local image files
const teamCrestMapping = {
  // Major teams
  'Barcelona': '/Spain - LaLiga/FC Barcelona.png',
  'Real Madrid': '/Spain - LaLiga/Real Madrid.png',
  'Atlético Madrid': '/Spain - LaLiga/Atlético de Madrid.png',
  'Valencia': '/Spain - LaLiga/Valencia CF.png',
  'Sevilla': '/Spain - LaLiga/Sevilla FC.png',
  'Villarreal': '/Spain - LaLiga/Villarreal CF.png',
  'Athletic Bilbao': '/Spain - LaLiga/Athletic Bilbao.png',
  'Real Sociedad': '/Spain - LaLiga/Real Sociedad.png',
  'Celta Vigo': '/Spain - LaLiga/Celta de Vigo.png',
  'Málaga': '/Spain - LaLiga/Malaga FC.png',
  'Espanyol': '/Spain - LaLiga/RCD Espanyol Barcelona.png',
  'Rayo Vallecano': '/Spain - LaLiga/Rayo Vallecano.png',
  'Elche': '/Spain - LaLiga/Elche CF.png',
  'Levante': '/Spain - LaLiga/Levante UD.png',
  'Getafe': '/Spain - LaLiga/Getafe CF.png',
  'Granada': '/Spain - LaLiga/Granada FC.png',
  'Eibar': '/Spain - LaLiga/Eibar FC.png',
  'Almería': '/Spain - LaLiga/Almeria FC.png',
  'Córdoba': '/Spain - LaLiga/Corodoba FC.png',
  
  // Additional teams
  'Real Betis': '/Spain - LaLiga/Real Betis Balompié.png',
  'Osasuna': '/Spain - LaLiga/CA Osasuna.png',
  'Mallorca': '/Spain - LaLiga/RCD Mallorca.png',
  'Girona': '/Spain - LaLiga/Girona FC.png',
  'Alavés': '/Spain - LaLiga/Deportivo Alavés.png',
  'Valladolid': '/Spain - LaLiga/Valladolid FC.png',
  'Leganés': '/Spain - LaLiga/Leganes FC.png',
  'Huesca': '/Spain - LaLiga/Heusca FC.png',
  'Cádiz': '/Spain - LaLiga/Cadiz FC.png',
  'Las Palmas': '/Spain - LaLiga/Las Palmas.png',
  'Deportivo LC': '/Spain - LaLiga/Deportivo FC.png',
  'Deportivo La Coruña': '/Spain - LaLiga/Deportivo FC.png'
};

// All external URL patterns to replace
const urlReplacements = [
  // Real Betis variations
  { old: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Real_Betis_logo.svg', new: '/Spain - LaLiga/Real Betis Balompié.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Real_Betis_logo.svg', new: '/Spain - LaLiga/Real Betis Balompié.png' },
  
  // Osasuna
  { old: 'https://upload.wikimedia.org/wikipedia/en/6/6a/CA_Osasuna_logo.svg', new: '/Spain - LaLiga/CA Osasuna.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/3/3c/CA_Osasuna_logo.svg', new: '/Spain - LaLiga/CA Osasuna.png' },
  
  // Mallorca
  { old: 'https://upload.wikimedia.org/wikipedia/en/1/12/RCD_Mallorca_logo.svg', new: '/Spain - LaLiga/RCD Mallorca.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/5/5e/RCD_Mallorca_logo.svg', new: '/Spain - LaLiga/RCD Mallorca.png' },
  
  // Girona
  { old: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Girona_FC_logo.svg', new: '/Spain - LaLiga/Girona FC.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/5/54/Girona_FC_logo.svg', new: '/Spain - LaLiga/Girona FC.png' },
  
  // Alavés
  { old: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Deportivo_Alaves_logo.svg', new: '/Spain - LaLiga/Deportivo Alavés.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/2/29/Deportivo_Alav%C3%A9s_logo_%282020%29.svg', new: '/Spain - LaLiga/Deportivo Alavés.png' },
  
  // Valladolid
  { old: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Real_Valladolid_crest.svg', new: '/Spain - LaLiga/Valladolid FC.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/2/29/Real_Valladolid_logo.svg', new: '/Spain - LaLiga/Valladolid FC.png' },
  
  // Leganés
  { old: 'https://upload.wikimedia.org/wikipedia/en/b/b5/CD_Legan%C3%A9s_logo.svg', new: '/Spain - LaLiga/Leganes FC.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/2/2c/CD_Legan%C3%A9s_logo.svg', new: '/Spain - LaLiga/Leganes FC.png' },
  
  // Huesca
  { old: 'https://upload.wikimedia.org/wikipedia/en/5/56/SD_Huesca_logo.svg', new: '/Spain - LaLiga/Heusca FC.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/2/2c/SD_Huesca_logo.svg', new: '/Spain - LaLiga/Heusca FC.png' },
  
  // Cádiz
  { old: 'https://upload.wikimedia.org/wikipedia/en/6/6e/C%C3%A1diz_CF_logo.svg', new: '/Spain - LaLiga/Cadiz FC.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/2/2c/C%C3%A1diz_CF_logo.svg', new: '/Spain - LaLiga/Cadiz FC.png' },
  
  // Las Palmas
  { old: 'https://upload.wikimedia.org/wikipedia/en/0/0f/UD_Las_Palmas_logo.svg', new: '/Spain - LaLiga/Las Palmas.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/5/59/UD_Las_Palmas_logo.svg', new: '/Spain - LaLiga/Las Palmas.png' },
  
  // Rayo Vallecano variations
  { old: 'https://upload.wikimedia.org/wikipedia/en/1/13/Rayo_Vallecano_logo.svg', new: '/Spain - LaLiga/Rayo Vallecano.png' },
  
  // Almería variations
  { old: 'https://upload.wikimedia.org/wikipedia/en/Almeria_logo.svg', new: '/Spain - LaLiga/Almeria FC.png' },
  { old: 'https://upload.wikimedia.org/wikipedia/en/File:UD_Almería_logo.svg', new: '/Spain - LaLiga/Almeria FC.png' },
  
  // Elche variations
  { old: 'https://upload.wikimedia.org/wikipedia/en/Elche_logo.svg', new: '/Spain - LaLiga/Elche CF.png' },
  
  // Cádiz variations
  { old: 'https://upload.wikimedia.org/wiki/File:Cd_cadiz_logo.svg', new: '/Spain - LaLiga/Cadiz FC.png' }
];

const standingsDir = path.join(__dirname, 'data/laliga/standings');
const files = fs.readdirSync(standingsDir).filter(file => file.endsWith('.js'));

console.log(`Found ${files.length} standings files to update...`);

files.forEach(file => {
  const filePath = path.join(standingsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let updatedCount = 0;
  
  console.log(`\nUpdating ${file}...`);
  
  // Replace all external URLs with local paths
  urlReplacements.forEach(replacement => {
    if (content.includes(replacement.old)) {
      content = content.replace(new RegExp(replacement.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement.new);
      updatedCount++;
      console.log(`  ✓ Replaced: ${replacement.old.split('/').pop()} → ${replacement.new.split('/').pop()}`);
    }
  });
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ ${file} updated with ${updatedCount} replacements`);
});

console.log('\n🎉 All LaLiga standings files have been updated with local crest URLs!');
console.log('Note: Some teams may not have local images available yet.');

