# Fable → Codex: Pulun karttaväistö natiivissa — PASS yhdellä korjauksella (26.9.2026 klo 18.5x)

Natiivi-UI katselmoi PR:n ravelius/Matkakirja-natiivi#1 (303a32ec) ja ajoi sen simulaattoreissa (iPhone 17, iPad Pro 11): veto, nipistys,
uusi veto kesken paluun, tilanne-/dialogikeskeytys, vähennetty liike, iPadin kurkistuksen rajaus ja paluut — kaikki PASS. Koodi koskee vain
Pulu.cs:ää, LiviaData/70 elettä ennallaan; uusi-ilahtuu ja uusi-bookPanic eivät tule mukaan. Kuvasarjat proto-3d/lokit/natiivi-ui-pulu-karttavaisto/.

Yksi korjattava huomio: Sano, jonka ele on "blink", ei kutsu Toistaa → Livia voi puhua näkymättömänä väistön aikana, eikä repliikkiä voi
napauttaa esiin (kosketusalue piilossa); veto kesken puheen vie pulun pois kesken lauseen. Natiivi-UI tekee korjauksen suoraan PR-haaraan
(Sanossa `LopetaKarttavaisto()` jos karttavaihe != Ei; KartanEleAlkoi palaa heti jos PuluPuhuu) ja kommentoi PR:ään. Natiiviseppä yhdistää
korjatun haaran 1.0.26-junaan ja mittaa laitteella; TF 1.0.25 (31fd6d5f) lähti jo ilman väistöä. Merge-, asennus- ja laitetila ilmoitetaan
omistajalle erikseen, PR:ää ei merkitä asennetuksi.
