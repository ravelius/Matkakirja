// Vuorikohteiden kuvakarusellit: käsin kuratoidut valokuvat kartan
// maastonimien "Lue lisää" -ikkunaan.
//
// Omistajan tilaus 10.8.2026 (kuvakaappaus Kaukasus-popupista):
// "Vuorilta on varmasti hienoja kuvia. Niitä voisi lisätä jopa
// kymmenen. Tällaisiin kohteisiin, samanlaisiin karuselliin, voi käydä
// kaikki vuorikohteet läpi samalla tavalla ja lisätä laadukkaita
// kuvia."
//
// --- miksi käsin ja miksi tässä ---
//
// Maastonimen i-nappi avaa saman ikkunan kuin kaupungit, ja se osaa
// näyttää artikkelin kuvat karusellina ilmaiseksi. Wikipedian
// artikkelin kuvasto ei kuitenkaan kelpaa vuorille: Karpaattien
// artikkelissa on kaksi karttaa ja geologinen leikkaus, Uralilla
// rajapyykki. Kartan tummin läiskä ansaitsee parempaa, joten kuvat on
// valittu käsin.
//
// Avain on maastonimen `avain` (js/packs/maasto-nimet-vuoret.js), EI
// Wikipedia-otsikko. Otsikot törmäävät: Madagaskarin ylängön artikkeli
// on "Madagaskar", ja sama otsikko on Afrikan laudan saarikohteella —
// otsikkoavain olisi antanut kaupungille vuoristogallerian.
//
// --- mistä kuvat ovat ja mitä niistä on tarkistettu ---
//
// Kaikki Wikimedia Commonsista, vain PD- ja CC-lisenssit ilman ND- ja
// NC-ehtoa. Ehdokkaat on koottu Commonsin KATEGORIASTA, joka on sidottu
// vuoristoon Wikidatan kautta (tools/hae-vuorikuvat.mjs) — ei
// nimihaulla, koska hakutuloksen otsikko ei kerro, mikä vuori kuvassa
// on.
//
// JOKAINEN KUVA ON KATSOTTU SILMÄLLÄ ennen hyväksyntää
// (tools/tee-kuvataulu.py latoo ehdokkaat 480 pikselin ruuduiksi).
// Automaattinen seula ei näe väärää vuorta, vesileimaa eikä pehmeää
// tarkennusta; niistä kaikista on tässä työssä hylätty ehdokkaita.
//
// --- kentät ---
//
// tiedosto  Commonsin tiedostonimi ilman "File:"-etuliitettä. Yhdellä
//           rivillä (julkaisusääntö), vaikka nimi olisi pitkä.
// selite    suomenkielinen kuvateksti: mitä kuvassa näkyy ja mistä.
//           Kirjoitettu Commonsin kuvauksen POHJALTA, ei käännetty
//           sellaisenaan.
// lahde     tekijä ja lisenssi pelin vakiomuodossa
//           "Tekijä, Wikimedia Commons (CC BY-SA 4.0)". Tekijä on
//           Commonsin Artist-kentästä, ei muistista — väärä
//           tekijämerkintä on lisenssirikkomus siinä missä puuttuvakin.
//
// Enintään kymmenen kuvaa kohteessa (omistajan katto). Vähempi on
// parempi kuin heikko täytekuva: kuudesta upeasta jää parempi
// muistijälki kuin kymmenestä keskinkertaisesta.

export const VUORIKUVAT = {
  kaukasus: [
    {
      tiedosto: 'Селение Ний.jpg',
      selite: 'Niyn kylän vainah-tornit Ingušiassa. Tornit olivat yhtä aikaa '
        + 'asuntoja ja linnoituksia, ja samaa rakennustapaa on kaikkialla '
        + 'Ingušiassa ja Tšetšeniassa. Taustan huiput ovat pilven peitossa.',
      lahde: 'Altushkin, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'View of Stepantsminda.jpg',
      selite: 'Stepantsminda Kvemi Mtan rinteeltä 2 170 metristä nähtynä. '
        + 'Vasemmalla kohoaa Khuro (4 071 m) ja takana Šanin valkoinen '
        + 'huippu (4 451 m).',
      lahde: 'WaltDisno, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Утро в горах Кавказа.jpg',
      selite: 'Aamu Kaukasuksen vuorilla: aurinko osuu ensin ylärinteiden '
        + 'niittyihin, kun laakson pohja on vielä varjossa.',
      lahde: 'Ilja Bunin, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Тебердинский заповедник. Вид на ледник и перевал Птыш.jpg',
      selite: 'Teberdan luonnonsuojelualue Luoteis-Kaukasuksella: jäätikkö ja '
        + 'Ptyšin sola syyskuussa, kun rinteiden lehtipuut ovat jo ruskassa.',
      lahde: 'Aleksandr Baidukov, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountains near Karadla.jpg',
      selite: 'Kevätaurinko Karadlan yllä: lumiset huiput nousevat metsäisen '
        + 'laakson yläpuolelle, ja kevään sulamisvedet ovat vielä matkalla '
        + 'alas.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Qalayxudat, Guba.jpg',
      selite: 'Vuoristotie Qalayxudatin kylälle Quban seudulla '
        + 'Azerbaidžanissa. Talvella tie on ainoa yhteys kylään, ja se kulkee '
        + 'lumihuippujen juurella.',
      lahde: 'Judaideep, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Balakən District Nature - View of the Greater Caucasus Mountains.jpg',
      selite: 'Suur-Kaukasuksen vihreitä selänteitä Balakənin piirikunnassa '
        + 'Luoteis-Azerbaidžanissa. Metsäraja jää alas, ja ylin vyöhyke on '
        + 'pelkkää laidunniittyä.',
      lahde: 'Golden, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Balakən District Nature - River Cutting through the Greater Caucasus Mountains.jpg',
      selite: 'Vuoristopuro on leikannut uoman Suur-Kaukasuksen laaksoon '
        + 'Balakənin piirikunnassa. Kuva on kesäkuulta, ja laakson pohjalla on '
        + 'yhä lunta.',
      lahde: 'Golden, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Mt Turklitau. Border between Levashinsky and Gunibsky District.jpg',
      selite: 'Turklitau-vuoren itäsivu Dagestanissa. Eteläinen rinne on '
        + 'lähes kasviton, ja vuori jatkuu paljon pidemmälle kuin kuvaan '
        + 'mahtuu.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountains near Karadla 2.jpg',
      selite: 'Vuoristotie kiertää rinnettä Karadlan lähellä. Vastapäätä '
        + 'nousee lumihuippu, ja tien ja huipun välissä on koko laakso.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],
};

/**
 * Kohteen kuvat maastonimen avaimella, tai null jos kohdetta ei ole
 * vielä kuratoitu.
 *
 * Null eikä tyhjä taulukko: kutsuja erottaa "ei kuratoitu" (näytä
 * Wikipedian oma kuvasto) ja "kuratoitu tyhjäksi" toisistaan.
 */
export function vuorikuvat(avain) {
  const kuvat = VUORIKUVAT[avain];
  return kuvat?.length ? kuvat : null;
}
