// ELEET PUHEEN TAHDISSA (Siirtoseppä 7.10.2026; omistaja 7.10. 01.3x: "Tehdään linna loppuun mahdollisimman hyväksi (eleet yms.)",
// linna valmiiksi -listan kohta 1). Ennen ele soi vain vuoron alussa (vuorot[].ele); nyt puhujan kertaeleet osuvat lauseiden ja
// painotusten alkuun ja kuulijat reagoivat lauseen loppuun. Kaksi lähdettä:
// - Kohdistuksesta (aanet[id].kohdistus): painotus = lauseen/lausekkeen ensimmäinen sana (välimerkin jälkeen) tai pitkä sana
//   (≥ PitkaSana kirjainta), aikana sanan alku; lauseen loppu (. ! ? …) viimeisen kirjaimen lopussa, kysymys merkitään.
// - Puheen voimakkuudesta (TasoAjoitus), kun kohdistusta ei ole: fraasin alku = taso nousee tauon jälkeen, loppu = tauko puheen jälkeen.
// Painotukset harvennetaan MinValiS:iin (ele 1,2–3 s ei katkea kesken). Puhdas C#, testit Linssit-testit/Testit/EleajoitusTestit.cs.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Dioraama
{
    public static class Eleajoitus
    {
        public enum Laji { Painotus, LauseLoppu }

        public readonly struct Tapahtuma
        {
            public readonly double T; public readonly Laji Laji; public readonly bool Kysymys;
            public Tapahtuma(double t, Laji laji, bool kysymys) { T = t; Laji = laji; Kysymys = kysymys; }
            public override string ToString() => $"{Laji} {T:F2}{(Kysymys ? " ?" : "")}";
        }

        public const int PitkaSana = 7;
        public const double MinValiS = 2.2;

        /// <summary>Kohdistuksen tapahtumat aikajärjestyksessä (painotukset harvennettu MinValiS:iin; lauseen loput kaikki).</summary>
        public static List<Tapahtuma> Kohdistuksesta(Kohdistus k)
        {
            var tulos = new List<Tapahtuma>();
            if (k == null || string.IsNullOrEmpty(k.Merkit) || k.Alut == null || k.Loput == null) return tulos;
            string m = k.Merkit; int n = Math.Min(m.Length, Math.Min(k.Alut.Length, k.Loput.Length));
            bool lausekeAlkaa = true; double viimeisinPainotus = double.NegativeInfinity;
            int i = 0;
            while (i < n)
            {
                if (!char.IsLetterOrDigit(m[i]))
                {
                    if (".!?…".IndexOf(m[i]) >= 0 && i > 0)
                    {
                        // Lauseen loppu: edellisen kirjaimen loppu (välimerkin oma aika on usein tauon pituinen).
                        int j = i - 1; while (j >= 0 && !char.IsLetterOrDigit(m[j])) j--;
                        if (j >= 0)
                        {
                            bool kys = m[i] == '?';
                            // Peräkkäiset välimerkit ("?!", "...") yhdeksi lopuksi.
                            if (tulos.Count == 0 || tulos[tulos.Count - 1].Laji != Laji.LauseLoppu || tulos[tulos.Count - 1].T != k.Loput[j])
                                tulos.Add(new Tapahtuma(k.Loput[j], Laji.LauseLoppu, kys));
                        }
                        lausekeAlkaa = true;
                    }
                    else if (",;:–—".IndexOf(m[i]) >= 0) lausekeAlkaa = true;
                    i++; continue;
                }
                int alku = i; while (i < n && (char.IsLetterOrDigit(m[i]) || m[i] == '-' || m[i] == '\'')) i++;
                int pituus = i - alku;
                // Kysymyslauseen ensimmäinen sana tietää jo, että lause on kysymys (ele_kysymys osuu kysymyksen alkuun).
                bool kysymysLause = false;
                if (lausekeAlkaa) for (int j = i; j < n; j++) { if (m[j] == '?') { kysymysLause = true; break; } if (".!…".IndexOf(m[j]) >= 0) break; }
                if ((lausekeAlkaa || pituus >= PitkaSana) && k.Alut[alku] - viimeisinPainotus >= MinValiS)
                {
                    tulos.Add(new Tapahtuma(k.Alut[alku], Laji.Painotus, kysymysLause));
                    viimeisinPainotus = k.Alut[alku];
                }
                lausekeAlkaa = false;
            }
            tulos.Sort((a, b) => a.T.CompareTo(b.T));
            return tulos;
        }

        /// <summary>Tapahtumat välillä (a, b] (a = edellinen kohta, b = nykyinen kohta + ennakko).</summary>
        public static void Valilla(List<Tapahtuma> tapahtumat, double a, double b, List<Tapahtuma> ulos)
        {
            ulos.Clear();
            if (tapahtumat == null) return;
            foreach (var x in tapahtumat) if (x.T > a && x.T <= b) ulos.Add(x);
        }
    }

    /// <summary>Fraasit puheen voimakkuudesta (ei kohdistusta): alku tauon (≥ TaukoS) jälkeen nousussa, loppu tauossa (≥ LoppuS)
    /// vähintään PuheS puheen jälkeen. Painotukset harvennetaan Eleajoitus.MinValiS:iin. Syötä joka kehys (t kasvaa).</summary>
    public sealed class TasoAjoitus
    {
        public const float Ylaraja = 0.30f, Alaraja = 0.08f;
        public const double TaukoS = 0.25, LoppuS = 0.45, PuheS = 1.2;
        bool puhuu; double hiljaaAlku = double.NegativeInfinity, puheAlku, viimeisinPainotus = double.NegativeInfinity;
        bool alkuun = true;

        public void Nollaa() { puhuu = false; hiljaaAlku = double.NegativeInfinity; viimeisinPainotus = double.NegativeInfinity; alkuun = true; }

        public Eleajoitus.Tapahtuma? Syota(double t, float taso)
        {
            if (!puhuu)
            {
                if (taso < Ylaraja) { if (double.IsNegativeInfinity(hiljaaAlku)) hiljaaAlku = t; return null; }
                bool taukoOli = alkuun || t - hiljaaAlku >= TaukoS;
                puhuu = true; puheAlku = t; hiljaaAlku = double.NegativeInfinity; alkuun = false;
                if (taukoOli && t - viimeisinPainotus >= Eleajoitus.MinValiS)
                {
                    viimeisinPainotus = t;
                    return new Eleajoitus.Tapahtuma(t, Eleajoitus.Laji.Painotus, false);
                }
                return null;
            }
            if (taso >= Alaraja) { hiljaaAlku = double.NegativeInfinity; return null; }
            if (double.IsNegativeInfinity(hiljaaAlku)) { hiljaaAlku = t; return null; }
            if (t - hiljaaAlku < LoppuS) return null;
            puhuu = false;
            return hiljaaAlku - puheAlku >= PuheS ? new Eleajoitus.Tapahtuma(hiljaaAlku, Eleajoitus.Laji.LauseLoppu, false) : (Eleajoitus.Tapahtuma?)null;
        }
    }
}
