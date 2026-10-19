# Päätoimittajan luovutus 19.10.2026 klo 21.25 (oma nollaus, konteksti 31 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332. Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261019-1950.md (käsitelty). Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-19-klo-1952-2115.md.
Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy. HUOM: tässä vuorossa EI ajettu odottaja- eikä codex-posti-vahtia → käynnistä heti.

## 0. HETI ALUSSA
1. Monitorit odottajat-vahti.py ja codex-posti-vahti.sh (30 min).
2. JUNA 206 LUKITTU 21.2x (LUKITSE NS:lle, BUILD 206 = 36615863b7fbd26c3edf2ce63206c3ff7c6c81f1). Seuraa JU:n TF:ää (~22.30–22.45). TF:ssä: junat.json "Juna 206" → "TF 206", teksti "Uutta (19.10. klo HH.MM; myös Macille …):" + nykyinen Valmiina-lista, tila "Testaajilla (TestFlight …)", eteneminen tyhjäksi (spesi luku 4) → rivi KK:lle.
3. Ulkoiset: TF 204 ja TF 205 ulkoinen jako Applen jonossa; kun valmis, päivitä tila-teksti.

## 1. Omistajan päätökset tässä vuorossa
- 19.18/19.20/19.24/19.48 Asemataulun säännöt + 19.51 "yksi tarkkaan speksattu työnkulku": loki #5006, #5007; speksi docs/moduulit/asemataulu.md + yksi komento + tarkistin #5008 (Projektiseppä, käytössä); Raamattu 7.39 viittaa speksiin #5011. Tarkistin: python3 -I tools/asemataulu/tarkista-junat.py --kansio scratchpad/asemataulu/data/talo (nyt 0 virhettä, 11 varoitusta vanhoista TF-riveistä). Eteneminen matka 1–2 = NS, 3–5 = JU (PT ei kirjoita matkaa).
- 20.55 OMISTAJA PYYSI JULKAISUA: "Koita saada juna 206 jo ennen puolta yötä valmiiksi. Haluan nähdä ensimmäisen version pelistä grafiikoineen, miten se saataisiin onnistumaan?" → 206 jäädytetty ja lukittu; laitekierros YÖLLÄ 206:n TF:llä; 207 aamuksi.

## 2. Junat
- TF 204 sisäinen 19.47, Mac 19.59. TF 205 sisäinen + Mac 20.06. Ulkoiset jonossa.
- JUNA 206 = 36615863b: juoksupeli (esteet/aarteet-v1, rikkoutumiset äänineen + arvonta, palatsivalo VS k3, kamerat: oviaukko, keskikolmannes, käännöksen lähikamera 1,6 m, HUD vain elinvoima/aarteet/matka), Aarnin 3 uutta aarretta + tekstit, oppaan kuvaraita (LS), Cupola-esilämmitys (NUI). Muutosloki #5013 (PT:n teksti). Runkosimu AJO 0; PUUTTEET (eivät estäneet): simun 3. väistöeste ei tullut 90 s:ssa (posliiniääni todistamatta), kameranykäyksiä simussa 33/19 → Laitetestaaja todentaa yöllä oikealla laitteella (ohjeistettu).
- JUNA 207 (aamuksi): PK pelikoodari/juoksupeli-207 8de23d083 (hiha-uv1 perusmalli) + hang_release (61033ea2) → kuvapari PT:lle; NUI palsta-haku 03deb7b16 (SK cbf820922 tekstit + pitkän kortin/hakunapin asettelu) → kuvapari; NUI aarrevideo e21b468a1 odottaa Codexin yörenderöintiä 02–06 (EI testivideolla, väliaikaiset poikkeamat kielletty); laitekierroksen korjaukset; JU:n pidossa-lista.

## 3. Roolit
- PK (nollattu 20.54): 207-erä yllä. VS: tulivuoret k13 → pimennys uudella tavalla (aito NASA/ISS-umbrakuva lautana, k4 paras kunnes voitetaan). NUI (nollattu 20.54): 207 yllä. LS, SK, Äänittäjä, Projektiseppä: levossa. NS 33 %: luovutus vasta lukituksen ja JU:lle siirron jälkeen (Postivahdille sanottu). Laitetestaaja: yökierros 206.
- Liuku-ääni jää pois (2 kierrosta, 0 hyväksyttyä). Uusi äänierä vasta juoksupelin pelitestin jälkeen.

## 4. Codex (posti claude/postilaatikko; Codex jättää nyt luonnokset T7:lle, MAILBOX-DELIVERY-STATE.json, Postivahti lukee)
Kuitattu: ovikamera-v2 548a9af48, puomilta-irti 05f01e136, pintakorjaus 7260fc9fa, pyyntö hiha+kainalo myös VIITTAmalliin (taso 2) 5d3860ac8. Odottaa: viittamallin korjaus, aarrevideo (yöllä 02–06).

## 5. PR:t
#5006 #5007 #5011 mergetty (PT). Tämä luovutus omana PR:nä. Työkansioon jäi tyhjä /Users/Shared/Claude/wt/fable-posti (vain .DS_Store, ei rm).
