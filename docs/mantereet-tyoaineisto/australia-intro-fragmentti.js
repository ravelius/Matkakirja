/*
 * AUSTRALIAN MAAINTRO — irrallinen palanen, EI vielä pelin koodissa.
 *
 * Kirjoittanut Opus 23.8.2026 Australian maalehden (MAA_KATEGORIAT.AUS)
 * yhteydessä. Tiedosto on tässä siksi, että Oseanian oma artikkelipaketti
 * `js/packs/oceania-artikkelit.js` on Sydneyn lehtiagentin tehtävä eikä
 * kahden agentin pidä luoda samaa tiedostoa rinnakkain (Fablen ohje).
 *
 * OHJE SEURAAVALLE: kun oceania-artikkelit.js perustetaan
 * northamerica-artikkelit.js:n mallilla, liitä alla oleva lohko sen
 * OMAT_ARTIKKELIT-olioon sellaisenaan. Avain on maan wiki-nimi
 * 'Australia' (sama avain, jolla cachedSummary hakee), ja maalla on vain
 * `intro`-kenttä — täsmälleen kuten USA:lla
 * (js/packs/northamerica-artikkelit.js, avain 'Yhdysvallat').
 * Tämän jälkeen tämän tiedoston voi poistaa.
 *
 * Jokainen väite on samasta erästä kuin maalehden tekstit ja tarkistettu
 * en-Wikipedian raakateksteistä 23.8.2026: kuusi siirtokuntaa ja
 * liittovaltio 1901 ("History of Australia (1851–1900)"), lennätinlinja
 * 1872 ("Australian Overland Telegraph Line"), viimeinen vankilaiva
 * 1868 ("Hougoumont (ship)"), väestönkasvu 430 000 → 1 170 000
 * ("History of Australia (1851–1900)"), 50 000–65 000 vuotta ja jopa
 * 500 kieliryhmää ("Aboriginal Australians"), nokkasiipän epäily 1799
 * ("Platypus"), merinolampaat 1797 ja villa puolena viennistä 1844
 * ("Australian Merino", "History of Australia").
 *
 * Mitta on sama kuin USA:n introssa (n. 1 000 merkkiä, yksi kappale,
 * ei huutomerkkejä, ei lihavointeja — USA:n rivi ei niitä käytä).
 */
export const AUSTRALIA_INTRO_FRAGMENTTI = {
  Australia: {
    intro: 'Australia ei ole vuonna 1873 vielä yksi maa vaan kuusi '
      + 'erillistä brittisiirtokuntaa, joilla on omat parlamenttinsa, '
      + 'lakinsa ja jopa raideleveytensä; liittovaltio syntyy vasta '
      + '1901. Aboriginaalikansat ovat asuttaneet mannerta 50 000–65 000 '
      + 'vuotta ja muodostaneet jopa viisisataa kieli- ja alueryhmää, '
      + 'joiden tähtitieto ja maanhoito ovat yhä käytössä. Viimeinen '
      + 'vankilaiva saapui Fremantleen 1868, joten rangaistussiirtolan '
      + 'aika on vasta juuri päättynyt. Kultaryntäykset kasvattivat '
      + 'väkiluvun 430 000:sta yli miljoonaan kymmenessä vuodessa ja '
      + 'tekivät Melbournesta suurimman kaupungin, ja hienovillaiset '
      + 'merinolampaat, joita tuotiin ensimmäisen kerran 1797, olivat jo '
      + '1844 puolet siirtokunnan viennistä. Mantereen eläimistö on niin '
      + 'omanlaisensa, että ensimmäiset tutkijat pitivät nokkasiippaa '
      + 'vuonna 1799 huijauksena. Edellisenä vuonna valmistunut '
      + 'mannertenvälinen lennätinlinja on juuri lopettanut Australian '
      + 'eristyneisyyden: viesti Eurooppaan kulkee nyt tunneissa eikä '
      + 'kuukausissa. Isoisän matkapäiväkirja saapuu mantereelle '
      + 'hetkellä, jolloin sen kuusi osaa ovat vasta löytämässä '
      + 'toisiaan.',
  },
};
