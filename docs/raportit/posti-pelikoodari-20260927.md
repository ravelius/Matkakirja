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

## Postivahdille (levyvahti)

- `wt/proto-pelikoodari-uusipeli` poistettu (177-avaimet on masterissa).
- `wt/pelikoodari-vanha-checkout` on SYMLINKKI (→ /Users/samireivinen/Matkakirja-pelikoodari → /Users/Shared/Claude/Matkakirja-pelikoodari = Pelikoodarin aktiivinen roolikansio). Ei vie tilaa; 1,1 Gt on aktiivinen checkout. Ei poisteta.
- `wt/pelikoodari-striimiaani-korjaus` poistettu (#3404 mergetty).

## Projektisivu valmis omistajan korttiin

Luonnos-PR #3410 (sisältää #3399:n + Pelistreak-korjauksen; julkaistaan vasta kortin jälkeen). Kuvat:
`/Users/Shared/Claude/proto-3d/lokit/projektisivu/projekti-tilanne-tyopoyta.png` ja `-puhelin.png` (+ jokainen välilehti, yötila).
Node --test 4463/0. Kysymykset:
1. Tilannekatsaus sanoo "117 peliä", pelikatalogin data 116.
2. Z10 298 335 + 78 211 laattaa näkyy sivulla "kahdessa kerroksessa" — oikein?
3. Otsikot ulkoiselle yleisölle: "Omistajan kortit" → "Pelin omat mekaniikat", "Omistajan ideat" → "Ideat".
4. docs/ (myös raakadatat, joissa sisäisiä merkintöjä) on Pagesissa julkisena kuten ennenkin; sivu itse suodattaa.

## P1 puhevirta MITATTU → Natiivisepälle (SendMessage-raja täynnä, välitä myös hänelle)

`pelikoodari/puhevirta-korjaus` 2aec7015 (merge-pyyntö lokit/merge-pyynto-pelikoodari-maisemakompressori.md, viimeinen osio).
Pariteetti-iPhone A2FD9C9F, käännös 64e551f6, tuotannon worker: virta pois 1. ääni 8 768 ms → palavirta 2 565 ms;
aani mittaa +9/+21/+33 s: MatkakirjaPuhe soi palojen yli. Virta = päällä oletuksena. Fyysinen laite vielä Laitetestaajalle.
Julkaisijalle: mittaus valmis, simulaattori sammutettu ja siivottu.

## Natiivisepälle: pelistreak-haaran uusi kärki 1d16d464

+ hintatasot 122 maahan (#3402) ja kultaiset uusittu; 336/336, unity 0. Korvaa 70bebdde:n (merge-pyyntölokin viimeinen osio).
HAVAINNEKUVA-sääntö (Fable 13.4x): läpikäynti web + natiivi agentilla käynnissä; projektisivulla ei korjattavaa.
