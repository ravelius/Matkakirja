# Pelikoodari: luovutus 10.11.2026 klo 03.15

Korvaa kaikki aiemmat. Edellinen: `git show 83a1ec8a6:docs/raportit/viesti-pelikoodari-luovutus-20261110-0244.md` (hoidettu tai alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu
(haara NYT pelikoodari/juoksu-kylma = 3a3011bb8, remote natiivi-backup; sisältää 96ec56672 + talot pois 544dd537c). Python ilman -I:tä.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-leivottu/ (SUUNNITELMA-vaihe2.md, TULOS-*.md, sk-ipad-kylma-2.txt).
Pulu-työpuu /Users/Shared/Claude/wt/pulu-kaupungit-maat (haara pelikoodari/pulu-kaupungit-maat = 90ed3a153, origin).

## TEHTY TÄSSÄ VUOROSSA
- KYLMÄ LATAUS 3a3011bb8 (JuoksuLeivottu: yhteinen kuvahakujono Pumppaa, glb:n kuvat kiireellisinä ≤ 8 rinnakkain, Esihae = koko paketin
  kuvat taustalla ≤ 6; QA "juoksupeli palatsi kuvahaut N" / "kuvaesihaku 0|1"). JU:n kylma-2 (lokit/pelikoodari-kylma-2, iso iPad 03.06):
  LATAUS 115,5 s (ennen 274 s, vanha leipomaton 122 s → junaehto kylmä ≤ vanha TÄYTTYY niukasti), kuvat 523/664 Mt valmiina 21,6 s:ssa,
  0 puuttuvaa kuvaa. Pullonkaula nyt glb-haut sarjassa: LOD1 33,0 s ja LOD0 40,6 s (ulkorengas 6,4, valmiin jälkeen 7,7). PT:lle raportoitu
  03.1x (+ ehdotus glb-esihausta).
- Vaihe2-0a (0b94205f1, kylmä, ei valmistunut 270 s:ssa) ei kelpaa; JU siirsi sen kansioon lokit/pelikoodari-vaihe2-0a-0b94205f1-kylma.
- PULU HETKET v5: KK:n tarkistus 25 korjausta + Wren 2 vanhaa kohtaa → VIETY ämpäriin pulu/vastaukset/v5/ (JU 02.58, GBR.json korvattu -4:llä
  03.0x, CDN a4f29274). PT kuittasi; junaan yhdessä v6:n + NUI:n polun kanssa.
- PULU v6 (90ed3a153): skandaalit + syvennykset (8 korttia, 16 + 48; PK-faktatarkistus 8, Opus-lähdetarkistus 14) + v3 Pariisi (10) ja
  v4 Lontoo (18) korjattuina (PT/KK 02.57 uusi käytäntö: jokainen paketti lähdetarkistukseen, kaksi Opus-apulaista, faktat-1/2.md).
  Paketti /Users/Shared/Claude/proto-3d/_valmiit/pulu-v6-skandaalit-20261110 (SHA256SUMS 44 OK, EI VIETY), KK:lle luettavaksi 03.1x.
  Työkalut: valmistele-skandaalit.mjs, luettavaksi.py, korjaa-faktat.py, yhdista-mallinostot.mjs PULU_KORVAA=1; rakennus SKANDAALIT/rakenna-v6.sh.
  HUOM: älä aja tarkista-era vaihe1/2 uudelleen SKANDAALIT-kansiossa (ylikirjoittaa vaihe*.json:n korjaukset txt:stä).

## JONO
1. JU:n vaihe2 0a/1a/0b/1b (3a3011bb8, lämmin) ja muisti-2 (3a3011bb8; talot tila 0 juoksussa, paluun kuvat
   muisti2-paluu-a/b/c) → lokit/pelikoodari-vaihe2-* ja pelikoodari-muisti-2: lohkot, latausaika, muistihuippu → rivi PT:lle (+ muisti-2 kuvat KK:lle).
2. KYLMÄ jatko (jos PT haluaa marginaalia): glb:t samaan esihakuun (hakemiston juoksupeli/*.glb taustalle kuten kuvat; JuoksuHahmot.Hae
   lukee välimuistista) → LOD0/LOD1-kierrosten 74 s verkko-odotus pois. Mittaus sk-ipad-kylma-2.txt uudelleen.
3. PULU v6: KK:n luku → korjaukset (MUUTOKSET-*.md-muoto, korjaa-faktat.py) → PT:n kuittaus → JU vie pulu/vastaukset/v6/ (vie-paketti vaatii
   nimen *-vienti-*, JU kopioi). Natiivin polku v4 → v6: NUI (PuluValmiitLataus.Juuri). Korttien epätarkkuudet PT:lle välitetty (Sisältökirjuri).
4. Kaupunki/maa-erä (1 870) lähdetarkistukseen vasta myöhemmin (PT kirjaa työlistaan).
5. LAV:n uusi lattia + valo → paketti-v3 (uusi kansio, Palvelin leivottu-v3). ÄLÄ muokkaa lattian geometriaa tai valoa.
6. JUNAAN vasta PT:n kuittauksella (huippu selvästi < 4080 Mt, kylmä ≤ vanha, lämmin nopeampi, kuvapari ilman valkoisia).

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh; 3a3011bb8: 0 virhettä). Laitteet: iso iPad JU:n vuorolla; iPhone mittaamatta, laite puuttuu.
