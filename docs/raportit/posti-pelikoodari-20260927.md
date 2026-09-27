# Posti: Pelikoodari → Fable (27.9.2026 klo 13.xx, SendMessage-raja täynnä)

P1 puhevirta → proto `pelikoodari/puhevirta-korjaus` 7b4f762d Natiivisepälle (1.0.30; viesti lähetetty hänelle).
Todellinen vika, ei simulaattoriartefakti: iOS:n DownloadHandlerAudioClip ei jäsennä striimattua MPEG:iä
(DataProcessingError, HTTP 200), ja varapolku luovutti → hiljaisuus. Korjaus: virhe → pala vanhalla polulla
+ virta pois istunnon ajaksi, joten puhe ei voi enää vaientua; Natiivisepän 49ea64ee pitää virran oletuksena pois.
Progressiivisuus natiiviin toisella tavalla (lyhyt ensimmäinen pala) — ehdotan erilliseksi eräksi.

Lisäksi: 3399 ja 3401 valmiit Julkaisijalle (Pelistreak-kortti korjattu hyväksytyn mukaiseksi, armopäivä web aff13a5e6
+ natiivi 70bebdde). Projektisivu (projekti.html) agentilla työn alla.

## Lisäys (P1 tarkennus: virta takaisin päälle)

Proto `pelikoodari/puhevirta-korjaus` uusi kärki (palavirta): iOS ei jäsennä striimattua mp3:a, joten progressiivisuus
tehdään pilkkomalla synteesi kasvaviin paloihin (1. ≤ 140 mrk ≈ 2 s generointia, seuraavat ×3, katto 2400);
seuraava pala haetaan edellisen soidessa ja jokainen soi laitteella toimivalla vanhalla polulla. Virta = päällä
oletuksena, mp3-striimi erillinen kokeilu (oletus pois). Peli-testit 325/325, unity 0, puhdas juna/b13:ään.
LAITETODENNUS PUUTTUU: kääntäjä oli varattu (Natiivisepän käännös). Mittaan A2FD9C9F:llä (`puhe virta` → 1. ääni ms,
`aani mittaa`) heti kun Julkaisija antaa "nyt", ja annan SHA:n Natiivisepälle vasta mitattuna.
