/*
 * UUDEN-SEELANNIN MAAINTRO — irrallinen fragmentti, EI vielä käytössä.
 *
 * Fablen ohje 23.8.2026: Oseanian ARTIKKELIT-paketin
 * (js/packs/oceania-artikkelit.js) luo Sydneyn agentti, joten NZL:n
 * maaintro kirjoitetaan tänne ja liitetään pakettiin sen jälkeen.
 * Liitä alla oleva lohko sellaisenaan OMAT_ARTIKKELIT-taulukkoon
 * avaimella 'Uusi-Seelanti' (sama avain kuin maailmankartta.js:n
 * countryShapes.NZL.wiki).
 *
 * Mitat lehtityö-reseptin 21.8.2026 lisäyksen mukaan: intro on 7–10
 * virkettä ja noin 700–1100 merkkiä, 2–3 kappaletta '\n\n'-rajalla,
 * 1–3 boldausta, ei huutomerkkejä. Maalehden maaosasto nojaa tähän
 * tekstiin yksin: NZL:n aihesivut (js/packs/maa-kategoriat.js) eivät
 * toista sen sisältöä vaan jatkavat siitä.
 *
 * Faktat tarkistettu en-Wikipediasta 23.8.2026 (Treaty of Waitangi,
 * New Zealand Wars, Otago Gold Rush, Dunedin (1874 ship), Pink and
 * White Terraces, Southern Alps, Birds of New Zealand) ja aineistona
 * docs/mantereet-tyoaineisto/faktapohja-uusiseelanti.md sekä
 * tarkistus-uusiseelanti.md.
 */
export const UUSISEELANTI_INTRO = {
  'Uusi-Seelanti': {
    intro: 'Uusi-Seelanti on kaksi pitkää, vuorista saarta eteläisellä '
      + 'Tyynellämerellä. Polynesialaiset '
      + 'purjehtijat löysivät ne avomeren yli satoja vuosia ennen '
      + 'eurooppalaisia ja antoivat maalle nimen Aotearoa, pitkän '
      + 'valkoisen pilven maa. Eristys teki luonnosta ainutlaatuisen: '
      + 'maanisäkkäitä ei ollut lepakoita lukuun ottamatta, ja linnut '
      + 'ottivat niiden paikat.'
      + '\n\n'
      + 'Vuonna 1840 kruunu ja yli viisisataa päällikköä allekirjoittivat '
      + 'Waitangin sopimuksen, jonka englannin- ja māorinkielinen teksti '
      + 'lupasivat eri asiat — ja juuri siitä syntyivät Uuden-Seelannin '
      + 'sodat, jotka päättyivät vasta vuonna 1872. Vuonna 1873 rauha on '
      + 'siis vuoden vanha ja maakysymys yhä auki. **Māorikulttuuri elää '
      + 'vahvana**: kaiverretut kanootit, kokoontumispaikat ja kasvojen '
      + 'kuviot ovat arkea, eivät museotavaraa.'
      + '\n\n'
      + 'Etelässä Otagon kultaryntäys muutti maakunnan vuosikymmenessä, '
      + 'pohjoisessa Rotoruan geysirit ja Vaaleanpunaiset ja Valkoiset '
      + 'Terassit vetävät matkailijoita, ja lampaat kantavat taloutta. '
      + 'Isoisän matka osuu tähän hetkeen tarkasti: tulivuori vie '
      + 'terassit kolmentoista vuoden päästä, ja yhdeksän vuoden päästä '
      + 'laiva nimeltä Dunedin vie ensimmäisen jäähdytetyn lihalastin '
      + 'Lontooseen.',
  },
};
