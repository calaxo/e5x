import xml.etree.ElementTree as ET
import os
import sys

# Obtenir le chemin du fichier depuis les arguments de la ligne de commande
filepath = sys.argv[1]

# Afficher le début du traitement
print("Début traitement du fichier : " + filepath)

# Extraire le nom de fichier sans extension
filename_without_ext = os.path.splitext(filepath)[0]

# Charger le fichier XML
tree = ET.parse(filepath)
root = tree.getroot()

# Espaces de noms pour éviter les préfixes ns0
ET.register_namespace('xmlns', 'http://www.w3.org/2001/XMLSchema')

# Rechercher et modifier la description en français
for narrative in root.findall('.//eccairs:Narrative/eccairs:ATTRIBUTES'):
    lang = narrative.find('eccairs:Narrative_Language')
    if lang is not None and lang.text == '20':  # Code langue pour le français
        narrative_text = narrative.find('eccairs:Narrative_Text/ns1:PlainText')
        if narrative_text is not None:
            narrative_text.text = "Nouvelle description de l'accident aéronautique."

# Sauvegarder le fichier modifié
output_filepath = filename_without_ext + "_done.xml"
tree.write(output_filepath, encoding="utf-8", xml_declaration=True)

print(f"Fichier traité enregistré sous : {output_filepath}")
