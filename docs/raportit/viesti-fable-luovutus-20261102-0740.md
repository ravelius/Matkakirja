# PT:n luovutus 2.11.2026 klo 07.40

Edellinen: viesti-fable-luovutus-20261102-0340.md (säännöt voimassa). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Syy: konteksti 27 % (luonteva tauko; raja 30 %). `date` ennen aikaleimoja.

## OMISTAJAN PÄÄTÖKSET (2.11.)
- 06.49 pyyntö + 07.18 kortti "Hyväksyn": Pariisin piirros näkyy kallistuksella 0° (suoraan ylhäältä, pohjoinen), näyttää G:ltä;
  korvaa 1.11. tulkinnan "suora = 31,8° + kapea kuvakulma". NUI 7455c79ea rungossa 024832f05. Montmartren ~0,5 km hyppy
  striimiin kallistettaessa omistajan tiedossa (G:n vinous).
- 07.09 palaute + 07.12 kortti "Tee kuten kirjoitin": EUNUKKIEN MÄÄRITTELY = eunukit juoksevat aina kohti, eivät ole koskaan
  pysähdyksissä, ja näkyvissä on yleensä vain yksi tai ei yhtään. (KK:n tulkinta "osa odottaa, muutama näkyvissä" PERUTTU.)

## JUNAT
- TF 217 kaikilla testaajilla 04.15 (iOS + Mac, runko 60bd5c356); 216 vanhennettu. Asemataulu Valmiina.
- Juna 218 auki, runko 024832f05 (NS): c2-v34 (holvi, LAV:n alaraja pois), osamallit791-v10 (bugi 8), tausta-v98 (muuriportin
  ovi LOD1/2, porttihallin päätyseinät katto-solmuun + kansi, bugi 12), rakennukset-v94 (bugi 14), PK bugi 13 ee17f6928,
  B2 376375704 (porttihalli häipyy), kamera4 ccc8eeda0, VS taivas 9fa1eee3e + leivontakynnys ca610fd07, NUI Pariisi 0°.
- PYSYVÄT KUITTAUKSET junaan 218 (NS tietää): LAV:n bugikorjaukset; PK:n juoksu 217 -bugilistan korjaukset, kun tallenne
  tarkistettu ja lähetetty PT:lle. Muut erät PT kuittaa.
- Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA" (yölupa päättyi omistajan herättyä 06.4x).

## ROOLIT (kaikki nollattu tänä aamuna; kaava: luovutus → "nollaa itsesi" → list_events "0 of 0" → aloitusviesti)
- PK (local_91a1bc27): eunukit 6b8e0b872 (pelikoodari/eunukit-218) + kohta 3 a70ef8f41 (alkulennon LOD kamerasta) valmiina;
  tallenteet 218f/218g JU:n vuorolla → PT katsoo → NS. Bugi 2 (ristikko-ovi 1.44,3–1.45,4): LAV ei löydä mallia PK:n
  koordinaateista (x 81,5 z −516…−499 vs t-portti-120 −85,2/119,75) → PK:lta piirtävän verkon nimi / mika-osuma LAV:lle.
- LAV (local_16f6f272): nollautumassa 07.3x (lisäys 233 ed2f9ba02). ALOITUSVIESTI LÄHETTÄMÄTTÄ, jos transkripti tyhjä:
  luovutus haarassa origin/lavastaja/lisays-217 (docs/raportit/viesti-fable-luovutus-20261027-lavastaja-1255.md, lisäykset
  228–233); jono: bugi 2 PK:n verkon nimen jälkeen; 214 sisätilat odottaa Codexia (9fc5e0026).
- VS (local_fa464945): rivi 52 jatkuu rappausrae (k21, JuoksuLattia); räystäsvarjo ei vikaa (oletusaurinko).
- NS (local_99130238): nollattu 07.2x, aloitusviesti lähetetty. NUI (local_43962c89): ei avointa työtä (PR 5945).
- KS (local_740947d7): Pariisi 0° ei tarvinnut laattoja; ei avointa erää PT:ltä.
- Bugilista (KK) proto-3d/lokit/bugit-juoksu-217-20261102/RAPORTTI.md; PK:n tila korjaus-218/bugit-218d/RAPORTTI.md:
  korjattu 4–9, 11–15; 1 lieventynyt; 10 artefakti; kesken 2 ja 3. KK:lle kerrottu (aamuyhteenveto).

## MUUT
- LEVY: sisäinen oli 28 Gi → siirsin 1.11. esikatselulokit (14 Gt) T7:lle /Volumes/T7 4TB/koodaus/proto-lokit-arkisto/
  linkein (12.19) → 42 Gi. 2.11. lokit ~32 Gt jäävät yösiirtoon. Swap 12 Gt.
- Työlista: "Simulaattorien käyttötapa" valmis (KK 04.02 yösiivous 102,6 Gt); uudet rivit "Pariisin piirros suoraan
  ylhäältä" (junassa 218) ja "Eunukit kuten kirjoitit".
- Postilaatikko: ei uutta postia koko yönä; monitori scratchpad/postilaatikko-vahti.sh (kopioi edellisen session scratchpadista).

## Säännöt, jotka opin
- Roolit täyttyvät 25–30 %:iin noin 30–40 minuutissa raskaissa erissä → nollauksia on paljon; nollauksen jälkeen jonossa
  ollut viesti voi käynnistää roolin ennen aloitusviestiä (PK 05.5x) → lähetä aloitusviesti silti perään.
- KK:n "tavoite"-tulkinta ei ole omistajan päätös; odota "OMISTAJAN PÄÄTÖS" -riviä ennen kuin muutos menee runkoon.
- Drone ei lennä oviaukkojen alta (2.177): kamera-ongelmat portissa ratkaistaan häivyttämällä rakennuksen yläosa katon mukana.
