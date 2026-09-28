# Linssisepän luovutus 29.9.2026 (v) — Linssiseppä (Opus) = myös Mallinseppä

*Kirjoitettu klo 01.3x (konteksti 67 %, erä valmis). Edellinen: -20260928-u.md.*

**Session id:t:** Päätoimittaja "Päätoimittaja (Opus, xhigh)" (local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31; sessio saattoi
vaihtua yöllä, lähetä nimellä) · Julkaisija "Julkaisija (Opus)" local_24e63224-112c-449a-b6a3-e10e4ed43f4b · Natiiviseppä
"Natiiviseppä (max)" local_fcc10552-5810-49bf-b0cf-188456f1231c · Linssiseppä 2 local_e675f86d-210c-416b-8d83-926194307a44 ·
Siirtoseppä "Siirtoseppä (Opus)" local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4 · Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b ·
Natiivi-UI "Natiivi-UI (Opus)". Kiireiselle sessiolle SendMessage NIMELLÄ.

**Kansiot ja työkalut:**
- Pysyvät (proto-3d/tyokalut/linssiseppa-ajot/, ei gitissä):
  - cupola3_pehmea.py: Cupola 3 -poltto (umpi + pehmeä + valojen vahvistus + alfatarkistus).
  - ajo-cupola3-ennen-jalkeen.sh: laiteajo, jossa sarjan latautumista odotetaan lokiriviltä ja käynnistystä 10 min.
  - koosta_cupola3_ennen_jalkeen.py.
- venv (PIL, numpy, scipy): /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/3b1d2bb5-b4ca-4199-b729-a1258297ee0d/scratchpad/venv.
  Se on scratchpadissa: jos siivous poistaa sen, luo uudelleen `python3 -m venv` + pip install pillow numpy scipy.
- Tämän session scratchpad …/3ae89ee0-29bc-4ef0-94dc-178cf0b1da01/scratchpad:
  - ajo-cl18…cl21b.sh, koosta_cl18–21.py, mittaa_c3.py, luonnos_cl19.py
  - c3u/ (umpi-kuvat), c3p/ (pehmea)
- Laitekuvat: proto-3d/lokit/linssiseppa-laite-20260928-cl17…cl21b/.
- Valmiit vertailut: proto-3d/lokit/linssiseppa-valmis-20260929-cupola3/.

## 1. KESKEN (tee ensin)

1. **Cupola 3:n merge-pyyntö on Natiivisepällä 1.0.41:tä varten:** haara linssiseppa/cupola3, 6da6664c. Master (BUILD 40) on
   yhdistetty ja merge-tree puhdas. Testit 395/395, unity-tarkistus 0.
   - Worktree on poistettu. Jos Natiiviseppä pyytää muutoksia:
     `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree add /Users/Shared/Claude/wt/proto-linssiseppa-cupola3 linssiseppa/cupola3`.
   - Seuraa mergeä. Web-pari on Siirtosepän #3587 samoilla kuvilla (iPad background-position 50 % 6,5 %).
2. **JUMI Päätoimittajalla:** Natiivi-UI:n nimiöt v2b (natiivi-ui/mallin-nimiot 7f799271) laitetarkistus. Luokitin esti sen minulta
   ("Modify Shared Resources"): sekä liittämisen cl17:ään että erillisen cl18:n valmistelun. Suositus: Natiivi-UI ajaa sen itse
   cl16-kaavalla (Visby kallistettu, Krumlov ylhäältä, grep mallilaatikoita). Odota päätöstä, älä yritä uudelleen.
3. **Natiivin astroselite** webin mallin jälkeen: odottaa, että Raamattu-PR #3527 mergetään (oli auki 29.9. klo 01).

## 2. VALMISTA 28.–29.9. (tämä sessio)

- **Cupola 3 = pyöreä kattoikkuna**, omistajan uusi suunta. Omistaja kuittasi cl18:n jälkeen "OK, junaan" (kulma A).
  - Codexin ohjaamo kulmina a (keskitetty, oletus) ja b (vino). Kuva valitaan laitteen muodosta: iPhone pysty, iPad vaaka, ja
    90° käännettynä iPhone vaaka ja iPad pysty.
  - Kolme reunavaloa auringon suunnasta. Rajaus cover × 1,04, ajelehdus puolitettuna.
  - A/B: `astro kyyti ohjaamo 3|3pehmea|3terava|3b|2`. Kaavat: docs/raportit/iss-realismi-suunnitelma-20260928.md §5.
- **Omistajan hionta "keskitä iPadin ikkuna, tummenna ja pehmennä aavistuksen":**
  - Keskitys background-positionilla (IssKuvakulma.Cupola3Rajaus). Translate paljasti cl19:ssä 16 pt:n aukon, koska UI Toolkit
    leikkaa cover-kuvan laatikkoon.
  - Pehmeä sarja (~2 näyttö-px).
  - UMPI: Codexin metalli oli alfa 245–254, ja maa ja alempi UI kuultivat läpi (musta 2 → 22). Todennus: tumma 0 -koe 11,4 → 0,1.
    Juurisyyn löysi Natiiviseppä minun cl19–cl20-mittauksistani.
  - Sävy on 1, koska hunnun poisto tummensi jo selvästi. 0,85 on A/B:nä.
- **Ämpäri:** karttanostot/20260928/iss-cupola3-{a,b}-* (Codexin alkuperäiset), -a-pehmea-* ja -a-pehmea-umpi-* (oletus).
  Kaikkien takaisinluku täsmää.
- **Muut:** proto-worktreet pilvet, horisontti ja cupola3 on poistettu (0 jäljellä). Vanhojen scratchpadien > 24 h
  -tiedostot poistettiin Postivahdin pyynnöstä (7,5 Gt). Muistiin tallennettu: ui-kierto-testikomento ja ui-kuvien-alfa-255.

## 3. AVOIMET

- Cupola 2 -kuvilla (pehmea4, kehys, ulkoosat) on sama alfa 252–254. Niitä käyttävät vain A/B-rajaukset katto (= 1.0.40:n
  kupoli) ja horisontti. Jos ne palaavat käyttöön, korjaa samalla poltolla uusin nimin.
- Linssiseppä 2 muuttaa IssKyytiNakyma.cs:n ohjaimia (linssiseppa2/kyyti-saatimet); merge-tree cupola3:n kanssa on puhdas.
- tools/gpu-vapaa.sh on tässä checkoutissa seurannattomana, ja ajoskriptien vuoro() käyttää sitä. Poista vasta, kun haara
  yhdistää mainin.
- Julkaisija jakaa käännös- ja laitevuorot (NYT / laite-nyt). Ilmoita aina "käännös valmis" ja "sammutettu".

## Opit

- Kierron testikomento on `ui kierto vaaka|pysty` ui-komento.txt:hen. Pelkkä `kierto` on tuntematon, joten cl17:n vaakakuvat
  jäivät pystyyn. simctl tallentaa iPhonen vaakakuvan vaakana ja iPadin pystyyn.
- UI Toolkit leikkaa cover-taustakuvan elementin laatikkoon. Kuvan siirto laatikossa tehdään background-positionilla (pisteinä
  Left/Top-avainsanasta, kuten AikajanaNakyma), ei translatella.
- Tarkista UI-kuvien alfa histogrammista (255 vs. 245–254). Alfa "> 250" ei paljasta vuotoa.
- Kuormitetulla koneella (load > 60) ensiasennuksen esilataus kestää yli 150 s. Odota "kerronta ohi" 600 s ja kuvasarjan
  vaihtoa lokiriviltä ("cupola3 valmis (…)"), ei kiinteällä unella.
- Omistajan linjaus 28.9. klo 23.3x: rajatut tehtävät (bugiselvitys, juurisyy, aineistoerä) annetaan Sonnet-ali-agentille
  (Agent, model sonnet). Rooli todentaa. Ali-agentti ei käytä simulaattoreita eikä käännöspalvelua.
