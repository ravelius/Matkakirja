# Natiivi-UI:n luovutus 27.9.2026 (y), NOLLAUS klo 17.3x (konteksti 73 %)

Jatkaa luovutusta (x) -20260927-tilinvaihto.md. Fable = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (päätoimittaja
tilapäisesti Opus). Simulaattorit: oma iPhone 17 FB234D08, jaettu iPad Pro 11 503000D1. Käännökset proto-kaanna.sh:lla
:00–:15-ikkunassa (Karttaseppä: ei polttoja ennen klo 22). Apuskriptit scratchpadissa: k.sh (kuten x), merkitse.py,
talous-tila.py (tallennuksen muokkaus: rahaton | loppu), web/talous-kuvat.mjs (webin talous-kuvat tuotannosta).

## VALMIIT TÄNÄÄN
- AVAUSKORTTI (11a3c43a): omistaja hyväksyi kuvaparit 35262df2 → Natiiviseppä kirjasi 1.0.30-junaan (juna/b13 23648936).
- MITÄ UUTTA -LÖYDÖS: juurisyy muutosloki-natiivi.json jäi build 11:een. Natiivin vartija natiivi-ui/mitauutta-build
  296ffd04 (asennetun buildin rivi aina kärjessä, "Peli päivittyi" vain edellistä asennettua uudemmat) → junassa
  (abd7ae10). Julkaisija: rivit 1.0.12–1.0.29 + TF-vartija #3405. CFBundleVersion = aikaleima (1.0.29 (202609270926)).
- 1.0.29-TODENNUS simulaattorissa: luennan säätimet + paneeli kerroksen juuressa, kaiutin tauko/jatko (rms 0,105 →
  0,006 → 0,106) PASS. "Ratas/kaiutin puuttuu iPhonella" EI VIKA: LISÄÄ vierittää yläriviä ylemmäs (löydös 131),
  ui puu listaa vain näkyvät; Laitetestaaja korjasi raporttinsa 84da8c2a7.
- Worktreet: kuvapakka poistettu; pulu-karttavaisto-codex on samireivinen-tilin (Codex poistaa, postilaatikko 98f4e19a1).

## TILANNE 17.2x
- TALOUS-UI 2addc08c on BUILD 30:ssä (master). Elämäpalkki (omistaja hyväksyi web #3421 16.5x): natiivi-ui/talous-vaihe1
  @ 1281414c (8 neliötä kartan yläreunaan, väistö, miniselite; lyhyt "0£ 2 vrk" kaikilla) → MERGE-PYYNTÖ Natiivisepällä
  1.0.31:een, kuvaparit Fablella (lokit/natiivi-ui-talous/kuvapari-elamapalkki2-{iphone,ipad}.png).
- LUENTA AINA (omistaja 15.5x): natiivi-ui/luenta-aina e8199dc0 (Pelikoodarin f4ab9dc2:n päällä) → merge-pyyntö lähetetty.
- HAVAINNEKUVA 793576bd, MITÄ UUTTA 296ffd04, AVAUSKORTTI 11a3c43a: junassa/masterissa.
- ALOITUSVALINTA (omistaja 16.3x/16.5x): pisteet → natiivi-ui/aloitusvalinta 7f699522 (NaytaVain(nakyvat) aina) →
  merge-pyyntö lähetetty. Pulun repliikit TOIMIVAT: esittely näkyy KERRAN LAITTEELLA (lippu matkakirja-livia-avaus, kuten
  web). KYSYMYS Fablella: jokaisessa uudessa matkassa? Diagnostiikkahaara natiivi-ui/livia-avaus 7cca24a9 (EI mergeä;
  poista, kun päätös tehty). Lipun poisto simulaattorista: `xcrun simctl spawn <UDID> defaults delete
  <data>/Library/Preferences/app.matkakirja.proto3d matkakirja-livia-avaus` (plutil-muokkaus ei mene cfprefsd:n ohi).

## JONO (Fable 17.3x, kaikki 1.0.32-junaan; merge-pyynnöt Natiivisepälle kuvaparin/mittauksen jälkeen)

### 1) VIERITYS (omistaja 17.0x) — natiivi-ui/vieritys-2 @ 34366dbd, työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-vieritys
Analyysi (Opus-agentti): opas/linssikatalogi ym. ~30 sivua käyttivät UITK:n ScrollViewia (heitto 1/3 Safarista, veto ei
1:1), kartta piirtyi arkin takana, katto 60 Hz. TEHTY haarassa: (a) Kosketusvieritys.LiitaYleinen kaikkien UiKerros-
juurien pystysuuntaisiin ScrollViewihin (haltuunotto vasta pystyvedossa, joten liukusäätimet/vaakaselaimet toimivat;
lehti ja nosto omilla liitoksillaan), (b) opas/linssipaneeli ≥ 85 % ruudusta → UiNakymat.PaivitaKuvaSumea taso Kokoruutu
(pysäytyskuva, pallon kamera pois; iPadin kapea arkki ei pysäytä). TEKEMÄTTÄ: (c) 120 Hz — Fable HYVÄKSYI ehdoin: vain
ProMotion, vain kosketuksen ja inertian ajan, vain kun kartta on pois piirrosta (PalloKierto.Peitetty); levossa heti
lepotaajuus; ProcessInfo.thermalState ≥ serious → katto 60. Paikka: Kartta/Ruudunpaivitys.cs rivit ~81/190–205
(LiikeKattoOletus 60, TaysiPitoS) — Natiivisepän tiedosto, sovi hänen kanssaan tai tee pieni "vieritys"-syy.
MITTAUS: scratchpad-skripti siirtyma.py (kopio alla) <video> [pt-leveys]. ENNEN (077548e0, `ui opas pariisi`, MCP-swipe
200 pt / 0,1 s, recordVideo): iPhone 612 pt, 56 liikkuvaa kehystä/s; iPad 813 pt, 48/s. JÄLKEEN sama; lisäksi 5 min
vieritystesti ennen/jälkeen lämpö/virta (kehysajat.jsonl, `cpu mittaa`), video rajattuna Fablelle.
18.00-käännös oli ajastettu tämän session taustalle (juna/b13+talous-vaihe1+luenta-aina+aloitusvalinta+vieritys-2,
FB234D08 + 503000D1): tarkista `ls -t proto-3d/lokit/kaannospalvelu/*vieritys*.log | head -1 | xargs tail -1`; jos ei
ajettu, aja seuraavassa :00–:15-ikkunassa.

### 2) KAUPUNKILEHDEN LUENTANAPPI + NOSTON RATAS (omistaja 17.1x)
- Kaupunkilehden luentanappi ei toimi TF 1.0.30:ssä: todenna laitteella mykistys (Äänimaisema) päällä JA pois; onko syy
  mykistys (korjaantuu luenta-aina e8199dc0:lla: Lehtinakyma Lue pyynnosta: true) vai rikki (kytkentä, puhepolku,
  puhevirta pois 29b). Jos webissäkin, rivi Pelikoodarille.
- Nostokortin ratas liian tumma kaiuttimeen verrattuna → sama sävy kuin kaiuttimessa (mittaa webin väri;
  .mk-lukija__ratas / __ratasikoni Matkakirja.uss ~3234).
### 3) ELÄMÄPALKKI 5 ORANSSIA + 3 PUNAISTA (omistaja 17.2x): 5 ensimmäistä oranssi, 3 viimeistä punainen, sammuneet
vaaleina — Pelikoodarin webin värit (odota viesti) → natiivi-ui/talous-vaihe1 1281414c:n päälle (.mk-elamapalkki__lohko).
### 4) AVAUSESITTELY "KERRAN + OHITA" (omistaja 17.2x): ensimmäisellä kerralla koko Livian esittely, seuraavissa uusissa
matkoissa lyhyt repliikki + ohita-nappi — Pelikoodari tekee webin ensin (repliikit + mitat). Natiivi: UI/Pulu/LivianAvaus.cs
+ Aloitusnakyma.AloitaPallovalinta. POISTA diagnostiikkahaara natiivi-ui/livia-avaus 7cca24a9 (ei mergeä).

### ODOTTAA NATIIVISEPÄLTÄ (merge-pyynnöt lähetetty): talous-vaihe1 1281414c (elämäpalkki), luenta-aina e8199dc0,
aloitusvalinta 7f699522.

### siirtyma.py (scratchpad; kopioi uuteen scratchpadiin)
Kehysten välinen pystysiirtymä videosta: ffmpeg -fps_mode passthrough → harmaa 201 px, arkin keskialue (x 15–85 %,
y 35–75 %), paras siirto −45…45 px ImageChops.difference-summalla, pt = px × (pt-leveys / 201). Tulostaa kehykset,
liikkuvat, matkan pt, huippunopeuden, liikkeen keston ja liikkuvat/s. (Tiedosto: /private/tmp/claude-502/…/scratchpad/
siirtyma.py tämän session scratchpadissa — kopioi talteen proto-3d/lokit/natiivi-ui-vieritys/siirtyma.py.)

## OPIT
- Päättynyt matka ei jää tallennukseksi (web poistaa, natiivi Aloitus) → loppukortti testataan elävänä: rahaton
  alkuVuoro = vuoroLaskuri − 7, sitten tutki + vastaa vaara + Jatka matkaa.
- Kuplien ajoitus: simctl-kuvasarja jää lepopiirrossa samaan kuvaan; käytä recordVideo + ffmpeg fps=2.
- Saari ilman rahaa (c:valletta, raha 0) antaa Odota-napin; kulkutapa odota -komento toimii.
- cfprefsd: PlayerPrefs-plistin muokkaus plutililla ei näy sovellukselle; käytä `simctl spawn <UDID> defaults delete|write`.
- Maailma-tila (kehittäjä) voi olla päällä simulaattorissa, vaikka plist ei sitä näytä (sama cfprefsd-syy).
- iPadin sovellussäiliö voi kadota levysiivouksessa: `simctl install` uudelleen ja launch "No such process" → odota 15 s.
