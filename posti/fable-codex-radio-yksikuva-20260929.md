# Päätoimittaja → Codex: radio yhtenä kuvana, alkuperäinen puu, omat valot valaisevat (29.9.2026)

Korvaa kuunvalotilauksen (`fable-codex-radio-kuunvalo-20260929.md`). Omistaja näki kuunvaloradion pelissä ja kirjoitti
29.9. sanatarkasti:

> "Tuo radio on ihan kamala. Nyt se on sininen, kun pitäisi olla niin, että se on sama puun väri, mutta siitä jäisi iso
> osa vain varjoon ja radion omat valot valaisisivat radion pintoja, mutta että siinä tietenkin toistuisi se puun väri
> eikä tuo sininen radio. Anna Codexille tehtäväksi tehdä kuva alkuperäisen näköisestä radiosta, mutta niin, että radion
> omat valot valaisevat pintaa takaa tulevan hieman sinärtävän valon lisäksi. Radio on aina päällä, joten ei tarvitse
> kikkailla tasojen kanssa, vaan Codex voi suoraan tehdä yhden kuvan. Ainut, mikä jätetään tyhjäksi, on VU-mittarin.
> Neula, joka animoidaan sekä näytön teksti."

## Mitä tehdään

- **Pohja on alkuperäinen radio** (`radio-uusi`, 6bb710954): sama muoto, sama lämmin punaruskea puu, messinki ja
  kaiutinkangas. **Ei sinistä runkoa.**
- **Valaistus:** radio on hämärässä huoneessa. Iso osa rungosta jää pehmeään varjoon, ja puun väri näkyy varjossakin
  tummana ruskeana. Pääasiallinen valo tulee radion omista lampuista: VU-mittarin lämmin taustavalo, meripihkainen
  näyttö, viritysasteikon valo ja punainen virtamerkki. Ne valaisevat lähipintoja: kehysten reunat, messinkilistat,
  nupin ja kaiutinkankaan lähimmän osan. Lisäksi takaa tulee **hieman sinertävä** reunavalo, joka piirtää rungon
  ääriviivan irti taustasta. Se on vain ohut reunavalo, ei pintojen väri.
- **Radio on aina päällä:** yksi valmis kuva, ei kerroksia eikä pois-tilaa. Kun pelaaja kääntää kytkimen pois, koko
  radio häviää ja linssi sulkeutuu.
- **Tyhjäksi jätetään vain:**
  1. **VU-mittarin neula**: taulu valmiina ja valaistuna, mutta ilman neulaa. Toimita neula erillisenä pienenä
     läpinäkyvänä PNG:nä samassa valossa, sama akseli kuin 6bb710954:n manifestissa.
  2. **Näytön teksti**: näyttö hehkuu meripihkaisena, mutta siinä ei ole kirjaimia (peli piirtää aseman nimen).
- Viritysasteikon lasin alle ei asemanimiä, koska peli piirtää ne kuten nyt. Punainen osoitin ja asteikon viivat
  saavat olla kuvassa.

## Tekniset

- Samat mitat ja sommittelu kuin 6bb710954: iPad-vaaka 1400 × 520 ja iPhone-pysty 1100 × 600. Neulan akseli, näytön
  tekstialue ja asteikon alue pysyvät täsmälleen samoissa kohdissa (manifest.json, kuten ennen).
- Tiedostot: `final/ipad/radio.png`, `final/ipad/vu-neula.png`, `final/iphone/radio.png`, `final/iphone/vu-neula.png`,
  RGBA sRGB, läpinäkyvä tausta radion ympärillä.
- `previews/`: sama kuva peliin sijoitettuna tummalla ja vaalealla taustalla.

Toimitus kansioon `~/Documents/Codex/<pvm>/radio-yksikuva/` ja ilmoitus `posti/codex-fable-radio-yksikuva-<pvm>.md`.
