# Valosepän luovutus 3.11.2026 klo 05.56

Syy: konteksti (pehmeä raja 25 %). Edellinen: viesti-valoseppa-luovutus-20261103-0518.md (pysyvät työtavat -20261101-2124.md,
-2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B alla = tämä kansio). Python:
`$B/tulivuoret/venv/bin/python -I`. Proto: worktree /Users/Shared/Claude/wt/proto-linssiseppa2-tulivuoret, haara
linssiseppa2/pimennys-aito (natiivi-backup), kärki **bd41b4ede**. Esikatselu vain JU:n "ESIKATSELU NYT" -viestillä, L2, ja
heti valmistuttua "VAPAA" JU:lle. HUOM: taustalla ajettu esikatselu kuolee nollauksessa → tarkista ajo.log; jos vain ALOITUS
ja lukon pid kuollut, aja uudelleen samalla vuorolla (esikatselu.sh siivoaa kuolleen lukon).

## PT:n järjestys (05.5x): sauma → tl2 → pim6, kukin pari PT:lle JU:n vuorolla
1. **Sauma (ODOTTAA JU:N VUOROA, pyydetty 05.5x)**: `zsh $B/sauma/s1/ajo.zsh` (2 ajoa: ennen 0e062a128 | jälkeen ed80de917,
   kuvat s1-k + s1-laaja, lokikansiot ajon tulosteessa). Syy: S2-maailma z6–10, kerroksen minimumLevel 0 → kaukaiset
   geometrialaatat z<6 tyhjä S2 → BMNG näkyi z5-rajasta 48,92 N (KS vahvisti datan ehjäksi). **ed80de917**: maailmassa alin
   taso 6 (AstronauttiKerros.PaivitaS2). PT:n tapa: S2 kaikkiin laattoihin joissa saatavilla; MISSÄ S2 LOPPUU pehmeä S2→BMNG-
   häivytys (ei suoraa reunaa) – tarkista s1-kuvista, näkyykö kattavuuden reunassa (meri/arktinen) suoraa laattareunaa; jos
   näkyy, se on vielä tekemättä. Kevätmosaiikkia EI. Pari ennen|jälkeen, KOKO näkymä, PT:lle (ennen = s1 0e062a128-ajosta;
   vertailuksi myös pim4 a5000-k-pois.png lokikansiossa esikatselu-20261103-052236).
2. **tl2 (bd41b4ede, EI VIELÄ KÄÄNNETTY)**: `$B/tahdenlennot-aito/tl2/ajo.zsh` (+ sk-tl2.txt): Tahdenlento.shader: valokäyrä
   radan kohdittain (Valokayra: nousu, välähdys _Valahdys kohdassa uf 0,72–0,82, sammuu pian), vana sammuu iän mukaan (_Hehku
   0,35 s), väri vaaleanpunavalkoinen, ohut ydin (_Ohut 8, nauha 3 × leveys) + halo, sinivihreä sivuhehku (_Sivu 0,35,
   _SivuAika 0,8); C# valo = 1 (käyrä varjostimessa). Katse 33, suunta −44 ja −34 maajäljestä (tl1: suunta 0 → suuntima 74°;
   aidossa ~30° koska Lyyran radiantti atsimuutissa ~70° ja aidon juova vino −57°) + s0 vertailuksi. Pari:
   `$B/tahdenlennot-aito/skriptit/pari.py lyridi/iss030e260480-orig.jpg <peli.png> 0.889 tl2/pari-X.jpg tl2/lahi-X.jpg "PELI tl2"`
   (lähikuvan laatikko aidon juovan kohdalla; tl1:ssä pelin meteori osui laatikon reunaan → säädä laatikkoa tarvittaessa).
3. **pim6**: aidon ISS071-E-5000:n rajaus: katse 48–55°, suunta 170 maajäljestä (= suuntima 296°, pim5-loki), zoom 51.1,
   siirra 47.6 -69.4, hetki kuun-varjo-2024 77.45 ennen kuvaa (pohja `$B/pimennys-aito/pim5/sk-pim5.txt`). Pari:
   `$B/pimennys-aito/skriptit/pari.py large/5000.jpg <peli.png> 1x0.896 pim6/pari-X.jpg 90` (aito kierretty 90°: vasen = NW).

## Tehty tässä sessiossa
- pim4 (5a99783c6) KUITATTU PT 05.4x: ydin musta (peli BGR 0/0/0, aito ~1/1/1), pehmeä reuna säilyi.
- Tähdenlennot: aito löytyi (skriptit/api.py, images-api): ISS030-E-260480 Lyridi 22.4.2012 05.34.22 UTC, nadir 19.9 N 88.5 W,
  24 mm, 5 s; havainnot LOYDOS.md. 0e062a128: parvi lyridit-2012 + `tahdenlennot ruutu vx vy [kirkkaus osuus vana]`.
  tl1-pari tl1/pari-s0.jpg PT:llä (rajaus osuu, meteori tasapaksu valkoinen pystytikku).
- pim5 (aidon rajaus): suunta 170 = 296° oikein, aito jyrkempi → pim6. `katse <alas> <suunta>`: suunta on MAAJÄLJESTÄ;
  `astro kyyti asento` kirjaa suuntiman.
- Laattasauma: KS:lle kerrottu, KS: data ehjä → PT antoi korjauksen VS:lle (yllä).
