// IHMISEN MATKAN TUTKIMUSVAIHE (web js/linssit/ihmisen-matka-tutkimus.js; Raamattu "IHMISEN
// MATKA: KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA, PULUN VALIHUOMIOT" ja "YKSI PALKKI").
//
// Esitys päättyy (Esitys.Lopussa) → linssi aloittaa tämän. Kello ei kulje, kamera ei seuraa
// ketään ja kartta on pelaajan oma:
//   1. NOSTOT  Kaikki kaaren löytöpaikat ja lisänostot sykkivinä pisteinä, kukin oman vanansa
//              väriin sävytettynä (NostonVirta). Napautus avaa kortin (Natiivi-UI).
//   2. NAPIT   Viisi nappia = viisi virtaa palkissa. Esityksen aikana legenda; tässä ne
//              heräävät: napautus kääntää pallon niin, että koko vana näkyy, korostaa sen ja
//              avaa lapun (nimi + yhteenveto); toinen napautus samaan palauttaa kaikki.
//   3. MUISTI  Valittu virta ja avoin kortti palautetaan ILMAN kameran kääntöä (kamera on
//              jo muistista paikallaan).
//
// Pisteiden piirto, napit, lappu ja kortti ovat Natiivi-UI:n (web DOM-merkit ja palkki);
// ydin kertoo ITutkimuksenNakyma-rajapinnalle, mitä näytetään, ja ajaa kameran.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Virrat;
using LatLon = Matkakirja.Linssit.Aikajana.LatLon;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Tutkimusvaiheen nosto (web kokoaNostot): löytöpaikka tai lisänosto ja sen virta.</summary>
    public sealed class TutkimusNosto
    {
        public string Tunnus, Otsikko;
        /// <summary>"loytopaikka" tai "lisanosto".</summary>
        public string Laji;
        /// <summary>Löytöpaikan järjestysnumero kaaressa; lisänostolla -1.</summary>
        public int Indeksi;
        public double Lat, Lon;
        /// <summary>Virta, jonka väriin piste sävytetään (datan kenttä tai lähin vanan kärki).</summary>
        public string Virta;
        /// <summary>Virran rintaman väri (#rrggbb) tai null = kulta (web heksaRgb-oletus 212, 175, 90).</summary>
        public string Vari;
        public Loytopaikka Paikka;
    }

    /// <summary>Tutkimusvaiheen näkyvät asiat (Natiivi-UI ja vanakerros).</summary>
    public interface ITutkimuksenNakyma
    {
        /// <summary>Nostot pisteinä kartalle; null = pois.</summary>
        void Nostot(IReadOnlyList<TutkimusNosto> nostot);
        /// <summary>Virtanapit toimintaan (tosi) tai takaisin legendaksi (epätosi).</summary>
        void Napit(bool toiminnassa);
        /// <summary>Valittu virta (null = ei valintaa): napin tila, vanan korostus ja lappu.</summary>
        void Valittu(Virta virta);
    }

    public sealed class Tutkimusvaihe
    {
        /// <summary>Kameran ajo napista (web KAANNON_KESTO_MS).</summary>
        public const double KaannonKestoMs = Esitysmatikka.KaannonKestoMs;

        readonly IReadOnlyList<Vana> vanat;
        readonly IReadOnlyList<Virta> virrat;
        readonly ILinssiYmparisto y;
        readonly ITutkimuksenNakyma nakyma;
        readonly Action tallenna;

        public IReadOnlyList<TutkimusNosto> Nostot { get; }
        /// <summary>Valitun virran tunnus tai null.</summary>
        public string Valittu { get; private set; }
        /// <summary>Auki oleva kortti (UI kertoo KorttiAuki-kutsulla); muistiin.</summary>
        public string Kortti { get; private set; }
        public bool Auki { get; private set; }
        /// <summary>Viimeisin kameran ajo (testit ja mittarit).</summary>
        public (LatLon keskus, double leveysAst, double kestoMs)? ViimeisinAjo { get; private set; }

        /// <summary>Kortin avauspyyntö muistista (Natiivi-UI avaa nostokortin).</summary>
        public event Action<string> AvaaKortti;

        public Tutkimusvaihe(IhmisenMatkaAineisto aineisto, IReadOnlyList<Vana> vanat, IReadOnlyList<Virta> virrat,
            ILinssiYmparisto ymparisto, ITutkimuksenNakyma nakyma, Action tallenna = null)
        {
            this.vanat = vanat ?? Array.Empty<Vana>();
            this.virrat = virrat ?? Array.Empty<Virta>();
            y = ymparisto;
            this.nakyma = nakyma;
            this.tallenna = tallenna;
            Nostot = KokoaNostot(aineisto, this.vanat, this.virrat);
        }

        /// <summary>
        /// Web kokoaNostot + kortin virta: löytöpaikat järjestyksessä (paikattomat pois), sitten
        /// lisänostot. Virta datasta tai lähimmästä vanan kärjestä.
        /// </summary>
        public static List<TutkimusNosto> KokoaNostot(IhmisenMatkaAineisto a, IReadOnlyList<Vana> vanat,
            IReadOnlyList<Virta> virrat = null)
        {
            var varit = (virrat ?? Array.Empty<Virta>()).Where(v => v.Tunnus != null)
                .GroupBy(v => v.Tunnus).ToDictionary(g => g.Key, g => g.First().Vari?.Rintama);
            var ulos = new List<TutkimusNosto>();
            void Lisaa(Loytopaikka p, string laji, int indeksi)
            {
                if (!double.IsFinite(p.Lat) || !double.IsFinite(p.Lon)) return;
                var virta = NostonVirta(p.Virta, p.Lat, p.Lon, vanat);
                ulos.Add(new TutkimusNosto
                {
                    Tunnus = p.Tunnus, Otsikko = p.Otsikko, Laji = laji, Indeksi = indeksi,
                    Lat = p.Lat, Lon = p.Lon, Virta = virta, Paikka = p,
                    Vari = virta != null && varit.TryGetValue(virta, out var c) ? c : null,
                });
            }
            for (int i = 0; i < a.Paikat.Count; i++) Lisaa(a.Paikat[i], "loytopaikka", i);
            foreach (var p in a.Lisanostot) Lisaa(p, "lisanosto", -1);
            return ulos;
        }

        /// <summary>
        /// Web nostonVirta: datan oma kenttä, tai lähimmän vanan kärjen virta (kärkikohtainen
        /// Virrat ratkaisee, koska selkäranka vaihtaa väriä matkalla).
        /// </summary>
        public static string NostonVirta(string oma, double lat, double lon, IReadOnlyList<Vana> vanat)
        {
            if (!string.IsNullOrEmpty(oma)) return oma;
            string paras = null;
            double parasEro = double.PositiveInfinity;
            foreach (var vana in vanat ?? Array.Empty<Vana>())
            {
                var pisteet = vana?.Pisteet;
                if (pisteet == null) continue;
                for (int k = 0; k < pisteet.Count; k++)
                {
                    double ero = Esitysmatikka.KulmaEro(lat, lon, pisteet[k].Lat, pisteet[k].Lon);
                    if (ero < parasEro)
                    {
                        parasEro = ero;
                        paras = (vana.Virrat != null && k < vana.Virrat.Count ? vana.Virrat[k] : null) ?? vana.Virta;
                    }
                }
            }
            return paras;
        }

        /// <summary>Vanojen kärjet, jotka kuuluvat virtaan (web virranPisteet).</summary>
        public IEnumerable<LatLon> VirranPisteet(string tunnus)
        {
            foreach (var vana in vanat)
            {
                var pisteet = vana?.Pisteet;
                if (pisteet == null) continue;
                for (int k = 0; k < pisteet.Count; k++)
                {
                    var v = (vana.Virrat != null && k < vana.Virrat.Count ? vana.Virrat[k] : null) ?? vana.Virta;
                    if (v == tunnus) yield return new LatLon(pisteet[k].Lat, pisteet[k].Lon);
                }
            }
        }

        /// <summary>
        /// Vaihe käyntiin (web luoTutkimusvaihe): nostot kartalle, napit toimintaan, muistista
        /// valittu virta (ilman kameraa) ja avoin kortti.
        /// </summary>
        public void Aloita(LinssiMuistiTila muisti = null)
        {
            if (Auki) return;
            Auki = true;
            nakyma?.Nostot(Nostot);
            nakyma?.Napit(true);
            var m = muisti?.Vaihe == "tutkimus" ? muisti : null;
            if (m?.Virta != null && virrat.Any(v => v.Tunnus == m.Virta)) Valitse(m.Virta, kamera: false);
            if (m?.Kortti != null && Kortti != m.Kortti && Nostot.Any(n => n.Tunnus == m.Kortti))
            {
                Kortti = m.Kortti;
                AvaaKortti?.Invoke(m.Kortti);
            }
        }

        /// <summary>
        /// Napin painallus (web valitseVana): sama nappi uudestaan palauttaa kaikki. Palauttaa
        /// valinnan jälkeen valitun virran tunnuksen (null = ei valintaa).
        /// </summary>
        public string Valitse(string tunnus, bool kamera = true)
        {
            if (!Auki) return Valittu;
            var virta = virrat.FirstOrDefault(v => v.Tunnus == tunnus);
            if (virta == null) return Valittu;
            Valittu = Valittu == tunnus ? null : tunnus;
            nakyma?.Valittu(Valittu == null ? null : virta);
            if (Valittu != null && kamera) KaannaVanaan(Valittu);
            tallenna?.Invoke();
            return Valittu;
        }

        /// <summary>UI:n kortti avautui (tunnus) tai sulkeutui (null).</summary>
        public void KorttiAuki(string tunnus)
        {
            if (Kortti == tunnus) return;
            Kortti = tunnus;
            tallenna?.Invoke();
        }

        /// <summary>
        /// Web kaannaVanaan: rajaus virran kärjistä (antimeridiaani purettuna), leveys
        /// kuvasuhteen mukaan molempiin suuntiin, 1,5 s ajo (vähennetty liike: hyppy).
        /// </summary>
        bool KaannaVanaan(string tunnus)
        {
            var rajaus = Esitysmatikka.VananRajaus(VirranPisteet(tunnus));
            var leveys = Esitysmatikka.RajauksenLeveys(rajaus, y.Kuvasuhde);
            if (!(rajaus is Rajaus r) || !(leveys is double l)) return false;
            double ast = Kameramatikka.LeveysAsteina(l);
            ViimeisinAjo = (new LatLon(r.Lat, r.Lon), ast, KaannonKestoMs);
            double ms = y.VahennettyLiike ? 0 : KaannonKestoMs;
            y.AjaKamera(new Nakyma(r.Lat, r.Lon, y.KorkeusLeveydelle(ast)), (float)(ms / 1000));
            return true;
        }

        /// <summary>Linssi sulkeutuu tai alkaa alusta (web pura).</summary>
        public void Pura()
        {
            if (!Auki) return;
            Auki = false;
            Valittu = null;
            Kortti = null;
            nakyma?.Valittu(null);
            nakyma?.Napit(false);
            nakyma?.Nostot(null);
        }
    }
}
