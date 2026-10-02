// PULUN TAULU (Astronautin kamera, omistaja 28.9.2026: siirtyminen linssin moodien välillä "aina esille napauttamalla
// pulua"; web js/linssit/pulu-taulu.js, PR #3590): puhdas logiikka natiiville (Linssiseppä 29.9.2026). UI on
// UI/Linssit/PulunTauluNakyma.cs.
//
//   Rivit        Maapallo · ISS:n rinnalla · ISS:n sisälle · Astronauttien kuvat (web ASTRO_TAULUN_RIVIT). ISS-rivit
//                vain, kun kyyti on olemassa, kuvat, kun linssillä on kohteita. Nykyinen moodi valittuna.
//   Moodi        kuva auki → Kuvat; kyydin tila Seuranta → Seuranta; Ikkuna tai Kohde (ylilento) → Ikkuna; muuten Pallo.
//   Askel        moodinAskel: yksi toimi kerrallaan, siirtymän aikana odotetaan (web 120 ms:n kierros, enintään 4 toimea,
//                katto 15 s). Kuvasta minne tahansa ensin kuva kiinni; pallolta ISS:n sisälle kaksi napautusta.
//   Sijoitus     kaksi ehdokasta, ensimmäinen vapaa voittaa: ylla (Pulun yllä, oikea reuna 12 pt) ja vieres (Pulun
//                vasemmalla, alareuna Pulun alareunan tasolla). Paikka ei saa leikata ISS-merkin aluetta (±56 pt) eikä
//                nousta ruudun yläreunan yli (8 pt); jos mikään ei sovi, ylla.
//   Lähin kohde  kuvamoodi avaa kameran katsetta lähimmän kohteen (web lahinKohde, isoympyrä).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Astronautti
{
    public enum AstroMoodi { Pallo, Seuranta, Ikkuna, Kuvat }

    public enum MoodinAskel { Perilla, Odota, SuljeKuva, Poistu, AvaaKuva, Napauta, Ei, LopetaKavely }

    public sealed class TaulunRivi
    {
        public string Tunnus, Otsikko, Selite;
        public AstroMoodi Moodi;
        public bool Aktiivinen;
    }

    /// <summary>Suorakaide ruudun pisteinä (vasen, yläreuna, oikea, alareuna; y kasvaa alaspäin).</summary>
    public readonly struct Laatikko
    {
        public readonly float Vasen, Yla, Oikea, Ala;
        public Laatikko(float vasen, float yla, float oikea, float ala) { Vasen = vasen; Yla = yla; Oikea = oikea; Ala = ala; }
        public bool Leikkaa(Laatikko b) => Vasen < b.Oikea && b.Vasen < Oikea && Yla < b.Ala && b.Yla < Ala;
        public override string ToString() => $"{Vasen:0},{Yla:0}–{Oikea:0},{Ala:0}";
    }

    /// <summary>Taulun paikka: Oikea null = ylla (oikea reuna OikeaReuna), muuten etäisyys ruudun oikeasta reunasta.</summary>
    public readonly struct TaulunPaikka
    {
        public readonly string Nimi;
        public readonly float Ala;
        public readonly float? Oikea;
        public readonly Laatikko Alue;
        public TaulunPaikka(string nimi, float ala, float? oikea, Laatikko alue) { Nimi = nimi; Ala = ala; Oikea = oikea; Alue = alue; }
    }

    public static class PulunTaulu
    {
        public const string Otsikko = "Minne katsotaan?";
        public const string KysyTeksti = "Kysy Pululta";
        public const string NakymatTeksti = "Näkymät";
        public const float Leveys = 232f, ReunaVara = 32f;
        public const float MoodinAskelMs = 120f, MoodinKattoMs = 15000f;
        public const int MoodinToimia = 4;
        public const float RakoPt = 8f, LeijunnanVaraPt = 5f, IssVaistoPt = 56f, PulunEleenVaraPt = 90f, PulunEleenSivuvaraPt = 14f;
        public const float OikeaReuna = 12f, AlaMin = 12f, YlaMin = 8f;
        public const float SeurantaMs = 400f, PulunPaikkaMs = 700f;
        public const float KyselyMs = 200f, HengahdysMs = 600f, AutomaattiKattoMs = 90000f;

        static readonly TaulunRivi[] rivit =
        {
            new TaulunRivi { Tunnus = "pallo", Moodi = AstroMoodi.Pallo, Otsikko = "Maapallo", Selite = "Koko Maa avaruudesta" },
            new TaulunRivi { Tunnus = "iss-rinnalla", Moodi = AstroMoodi.Seuranta, Otsikko = "ISS:n rinnalla", Selite = "Asema radallaan" },
            new TaulunRivi { Tunnus = "iss-sisalle", Moodi = AstroMoodi.Ikkuna, Otsikko = "ISS:n sisälle", Selite = "Cupolan ikkunasta alas" },
            new TaulunRivi { Tunnus = "kuvat", Moodi = AstroMoodi.Kuvat, Otsikko = "Astronauttien kuvat", Selite = "Valokuvat avaruudesta" },
        };

        /// <summary>Kaikki rivit tunnuksineen (web ASTRO_TAULUN_RIVIT).</summary>
        public static IReadOnlyList<TaulunRivi> KaikkiRivit => rivit;

        /// <summary>Nykyinen moodi (web nykyinenMoodi): kyyti null = ei kyytiä.</summary>
        public static AstroMoodi Nykyinen(bool kuvaAuki, Iss.KyydinTila? kyyti)
        {
            if (kuvaAuki) return AstroMoodi.Kuvat;
            if (kyyti == Iss.KyydinTila.Seuranta) return AstroMoodi.Seuranta;
            if (kyyti == Iss.KyydinTila.Ikkuna || kyyti == Iss.KyydinTila.Kohde) return AstroMoodi.Ikkuna;
            return AstroMoodi.Pallo;
        }

        /// <summary>Näkyvät rivit tässä tilassa, nykyinen moodi aktiivisena (web taulunRivit).</summary>
        public static List<TaulunRivi> Rivit(bool kyytiOn, bool kuviaOn, AstroMoodi nykyinen)
        {
            var l = new List<TaulunRivi>();
            foreach (var r in rivit)
            {
                // ISS:n rinnalla pois pelistä (omistaja 2.10.2026); kehittäjän seurantatilassa rivi palaa.
                if (r.Moodi == AstroMoodi.Seuranta && !Iss.IssKyyti.SeurantaKaytossa) continue;
                bool saatavilla = r.Moodi == AstroMoodi.Pallo || (r.Moodi == AstroMoodi.Kuvat ? kuviaOn : kyytiOn);
                if (!saatavilla) continue;
                l.Add(new TaulunRivi { Tunnus = r.Tunnus, Otsikko = r.Otsikko, Selite = r.Selite, Moodi = r.Moodi, Aktiivinen = r.Moodi == nykyinen });
            }
            return l;
        }

        public static TaulunRivi Rivi(string tunnus) => Array.Find(rivit, r => r.Tunnus == tunnus);

        /// <summary>
        /// Seuraava askel kohti moodia (web moodinAskel): kyyti null = ei kyytiä (ISS-moodeihin ei ole tietä).
        /// Puhdas funktio tilasta, joten askeleet testataan ilman palloa.
        /// </summary>
        public static MoodinAskel Askel(AstroMoodi tavoite, bool kuva, Iss.KyydinTila? kyyti, bool siirtyy, bool kavely = false)
        {
            if (kuva) return tavoite == AstroMoodi.Kuvat ? MoodinAskel.Perilla : MoodinAskel.SuljeKuva;
            // Avaruuskävelyltä Cupolaan (savuke 1117): ilmalukossa kyyti on jo Ikkuna ja ulkona napautus jatkaisi kävelyä, joten
            // kävely lopetetaan ensin (ulkona kyyti palaa sisään Cupolaan). Pallo ja kuvat: Poistu lopettaa kävelyn itse.
            if (kavely && (tavoite == AstroMoodi.Ikkuna || tavoite == AstroMoodi.Seuranta)) return MoodinAskel.LopetaKavely;
            var t = kyyti ?? Iss.KyydinTila.Kauko;
            bool kyydissa = t != Iss.KyydinTila.Kauko || siirtyy;
            if (tavoite == AstroMoodi.Pallo)
            {
                if (!kyydissa) return MoodinAskel.Perilla;
                return t == Iss.KyydinTila.Kauko ? MoodinAskel.Odota : MoodinAskel.Poistu; // Odota: paluulento kesken
            }
            if (tavoite == AstroMoodi.Kuvat)
            {
                if (kyydissa) return t == Iss.KyydinTila.Kauko ? MoodinAskel.Odota : MoodinAskel.Poistu;
                return MoodinAskel.AvaaKuva;
            }
            if (kyyti == null) return MoodinAskel.Ei;
            var kohde = tavoite == AstroMoodi.Seuranta ? Iss.KyydinTila.Seuranta : Iss.KyydinTila.Ikkuna;
            if (t == kohde) return MoodinAskel.Perilla;
            if (siirtyy) return MoodinAskel.Odota;
            // Kauko → Cupola, kohde → Cupola (kehittäjän seurantatilassa kauko → seuranta → ikkuna, ikkuna/kohde → seuranta).
            // Ikkunasta seurantaan ei ole tietä, kun seuranta on pois.
            if (kohde == Iss.KyydinTila.Seuranta && !Iss.IssKyyti.SeurantaKaytossa) return MoodinAskel.Ei;
            return MoodinAskel.Napauta;
        }

        /// <summary>
        /// Taulun paikka (web sijoita): pulu = Pulun laatikko eleen varoineen (yläreuna jo nostettu), W×H = ruutu,
        /// w×h = taulun koko, vaistettavat = ISS-merkin alue. vainYlos + edellinenAla: auki olevan taulun ylla-paikka ei
        /// laske kesken (Pulun ele nostaa laatikkoa, ei laske).
        /// </summary>
        /// <remarks>
        /// ylaMin: ylin sallittu yläreuna (näkymä antaa turva-alueen ja kyydin lukemarivin alareunan). YLHÄÄLLÄ-VARAPAIKKA
        /// (Linssiseppä 29.9.2026, Cupolan laitekuva 1.0.54): kun Pulu on ikkunan takana ruudun keskellä, kumpikaan paikka ei mahdu,
        /// ja taulu puristui yläreunaan (Kysy Pululta rivin päälle). Silloin taulu ankkuroidaan ylhäältä ylaMin:iin täydellä
        /// korkeudella, kunhan se ei ulotu Pulun päälle eikä väistettävään.
        /// </remarks>
        public static TaulunPaikka Sijoita(Laatikko pulu, float W, float H, float w, float h, IReadOnlyList<Laatikko> vaistettavat,
            string edellinen = null, float edellinenAla = 0f, float ylaMin = YlaMin)
        {
            float ylaAla = Math.Max(AlaMin, (float)Math.Round(H - pulu.Yla + RakoPt + LeijunnanVaraPt));
            if (edellinen == "ylla" && ylaAla < edellinenAla) ylaAla = edellinenAla;
            var ylla = new TaulunPaikka("ylla", ylaAla, null, new Laatikko(W - OikeaReuna - w, H - ylaAla - h, W - OikeaReuna, H - ylaAla));
            var ehdokkaat = new List<TaulunPaikka> { ylla };
            // Leijunta heiluttaa Pulua myös sivuttain, joten sama vara kuin yläpaikassa (+ eleen sivuvara).
            float vierOikea = (float)Math.Round(W - pulu.Vasen + RakoPt + LeijunnanVaraPt + PulunEleenSivuvaraPt);
            float vierAla = Math.Max(AlaMin, (float)Math.Round(H - pulu.Ala));
            if (W - vierOikea - w >= YlaMin)
                ehdokkaat.Add(new TaulunPaikka("vieres", vierAla, vierOikea, new Laatikko(W - vierOikea - w, H - vierAla - h, W - vierOikea, H - vierAla)));
            bool Osuu(Laatikko a)
            {
                if (vaistettavat != null) foreach (var v in vaistettavat) if (a.Leikkaa(v)) return true;
                return false;
            }
            foreach (var e in ehdokkaat)
            {
                if (e.Alue.Yla < ylaMin) continue;
                if (!Osuu(e.Alue)) return e;
            }
            float ylhAla = (float)Math.Round(H - ylaMin - h);
            var ylhaalla = new TaulunPaikka("ylhaalla", ylhAla, null, new Laatikko(W - OikeaReuna - w, ylaMin, W - OikeaReuna, ylaMin + h));
            // Pulun eleen vara (90 pt yläpuolella) saa jäädä taulun alle; itse Pulu ei.
            var pulunKeho = new Laatikko(pulu.Vasen, pulu.Yla + PulunEleenVaraPt, pulu.Oikea, pulu.Ala);
            if (ylhAla >= AlaMin && !ylhaalla.Alue.Leikkaa(pulunKeho) && !Osuu(ylhaalla.Alue)) return ylhaalla;
            return ylla;
        }

        /// <summary>ISS-merkin väistöalue (osuma-ala 44 pt + tila napautukselle vieressä).</summary>
        public static Laatikko IssAlue(float x, float y) => new Laatikko(x - IssVaistoPt, y - IssVaistoPt, x + IssVaistoPt, y + IssVaistoPt);

        /// <summary>Kameran katsetta lähin kohde isoympyrää pitkin (web lahinKohde); null, jos katse tai kohteet puuttuvat.</summary>
        public static Havaintokohde LahinKohde(IReadOnlyList<Havaintokohde> kohteet, double lat, double lon)
        {
            if (kohteet == null || double.IsNaN(lat) || double.IsNaN(lon) || double.IsInfinity(lat) || double.IsInfinity(lon)) return null;
            const double r = Math.PI / 180;
            Havaintokohde paras = null;
            double parasKos = -2;
            foreach (var k in kohteet)
            {
                double kos = Math.Sin(lat * r) * Math.Sin(k.Lat * r) + Math.Cos(lat * r) * Math.Cos(k.Lat * r) * Math.Cos((lon - k.Lon) * r);
                if (kos > parasKos) { parasKos = kos; paras = k; }
            }
            return paras;
        }
    }
}
