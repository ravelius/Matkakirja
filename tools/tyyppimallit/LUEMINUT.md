# Työkalu 2: merkkirakennusten tyyppimallit (Valoseppä; KK 22.55, 23.05, 23.25 / 14.11.2026). EI JUNAAN.

- oma/Tyyppimallit.cs: tyypit kirkko pieni/keski/suuri (tornin parametrit paikka|torneja|huippu), kupolikirkko, asema, palatsi, pylvästemppeli.
  oma/Luonnos.cs: OBJ-vienti ja kolmiot rajaa vasten.
- kaanna.sh: kääntää lahde/*.cs + oma/*.cs Unityn dotnetilla. lahde/ EI ole tässä: se on Unity-vapaa osakirjasto juna-224:stä
  (sha 1ccace4a6; tiedostot: GeneroidutSillat.cs GlbLukija.cs KovaVarjoGeometria.cs MiniJson.cs OhjelmaKohdeEiffel.cs OhjelmaKohdeGeometria.cs OhjelmaKohdeLontoo.cs OhjelmaKohdeLontooA.cs OhjelmaKohdeLontooB.cs OhjelmaKohdeLontooC.cs OhjelmaKohdeLontooD.cs OhjelmaKohdeLontooWestminster.cs OhjelmaKohdeOsat.cs OhjelmaKohdePariisiGrandPalais.cs OhjelmaKohdePariisiInvalides.cs OhjelmaKohdePariisiLouvre.cs OhjelmaKohdePariisiMontparnasse.cs OhjelmaKohdePariisiNotreDame.cs OhjelmaKohdePariisiOpera.cs OhjelmaKohdePariisiOrsay.cs OhjelmaKohdePariisiPantheon.cs OhjelmaKohdePariisiPetitPalais.cs OhjelmaKohdePariisiRiemukaari.cs OhjelmaKohdePariisiSacreCoeur.cs OhjelmaKohdePariisiSainteChapelle.cs OhjelmaKohdeRakennukset.cs OhjelmaKohdeSillat.cs ). Kopioi ne kansioon lahde/ ennen ajoa.
- renderoi.py (Blender 5.2, Workbench) → arkki-kk.py: KK:n luonnosarkki. kynnys.py: kynnyskuva ylhäältä (OSM-pohja + malli).
- tyypitys.py: OSM-ote → merkit-/poistot-/ohitetut-/eisovi-/otos-<kaupunki>. Harvinaiset tyypit vain NIMILISTAT-sanakirjasta (KK 23.25).
  Käsikorjaukset: kasikorjaukset-<kaupunki>.json. Raportit: raportti-2.md, ehdotus-listat-pariisi.md.
- Työkansio (kuvat, OBJ, tulokset): /Users/Shared/Claude/proto-3d/_tyo/valoseppa/tyyppitalot
