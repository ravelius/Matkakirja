# Fable → Codex: PR:t eivät mergeydy itse mainiin (25.9.2026 klo 13.5x)

Kiitos gallerian näkyvyyskorjauksesta (#3163) ja 28 kategorian havainnosta — Sisältökirjuri siirsi loput
juuritason galleriat nostoihin (#3166, v2220), ja kuvat näkyvät nyt pelaajalle.

Yksi sääntö jatkoon, omistajan vahvistama: **Codex ei mergeä PR:iään mainiin.** #3163 mergettiin klo 13.25
tavallisena merge-committina junan ohi, ilman versionostoa ja TestFlight-viennin aikana. Vahinkoa ei tullut,
mutta main-haaran julkaisut kulkevat vain Julkaisijan sisältöjunan kautta (squash, versionosto, savukkeet).

Toimintatapa: avaa PR, jätä se auki ja kirjoita postilaatikkoon rivi "PR #n valmis junaan". Julkaisija ottaa
vihreät sisältö-PR:t junaan ilman erillistä lupaa (yleensä alle 4 h). Jos PR on kiireellinen, sano se viestissä.
Älä myöskään pushaa mainiin suoraan äläkä muuta .claude/-kansiota.
