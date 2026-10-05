// TAVLIN BOTTI (Siirtoseppä 5.10.2026). Pelikehyksen negamax ei sovi noppapeliin (vastustajan siirrot riippuvat heitosta),
// joten Tavlilla on oma botti samalla Vastustaja-tasojaolla:
//   - Helppo: heuristiikan paras vuoro, mutta 35 % todennäköisyydellä satunnainen kahdeksan parhaan joukosta (tilaus oli
//     kolmen parhaan joukosta, mutta silloin helppo on lähes yhtä vahva kuin normaali ja vaikea voitti sen vain ≈ 66–68 %;
//     tavoite ≥ 75 %, kahdeksalla ≈ 79 %; ks. HelppoJoukko).
//   - Normaali: heuristiikan paras, 10 % häiriö Pelikehyksen merkityksessä (satunnainen laillinen vuoro). Kolmen parhaan
//     häiriöllä normaali oli käytännössä yhtä vahva kuin vaikean 1-taso, ja vaikea voitti sen vain ≈ 59 % (tavoite ≥ 60 %);
//     satunnaisella laillisella ≈ 65 %.
//   - Vaikea: 2-tasoinen expectimax. Heuristiikan VaikeaKarsinta parasta omaa vuoroa arvioidaan vastustajan 21 eri heiton
//     painotettuna keskiarvona (tuplat paino 1, muut 2, yhteensä 36); kullakin heitolla vastustaja pelaa heuristiikan
//     mukaan parhaan vastauksensa.
// Heuristiikka (Arvio, sen pelaajan näkökulmasta, joka juuri siirsi; vastustaja heittää seuraavaksi): pip-ero, omien
// yksinäisten osumatodennäköisyys × hinta (hinta kasvaa sitä mukaa kuin nappula on edennyt), suljetut pisteet (kotialueella
// paino ×2), prime-pituus, palkilla olevat (vastustajan palkki sitä arvokkaampi mitä useampi kotipiste on suljettu) ja
// poistovaiheen eteneminen. Kun kontaktia ei enää ole (kilpajuoksu), arvio on pip-ero ja poistetut.
// Satunnaisuus vain annetusta Satunnainen-lähteestä → sama siemen, sama vuoro (testit toistettavia).
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli.Pelit
{
    public static class TavliBotti
    {
        /// <summary>Vaikean botin expectimaxiin otettavat omat vuorot (heuristiikan parhaat).</summary>
        public const int VaikeaKarsinta = 8;
        /// <summary>Helpon häiriövuoro arvotaan näin monen heuristisesti parhaan joukosta (tilauksen 3 antoi vaikealle vain
        /// ≈ 66–68 % voittoja, 8:lla ≈ 79 %, tavoite ≥ 75 %). Normaalin häiriö = mikä tahansa laillinen vuoro.</summary>
        public const int HelppoJoukko = 8;
        static readonly TavliPainot W = new TavliPainot();
        public const double Voitto = 1_000_000;

        /// <summary>Häiriön todennäköisyys: helppo satunnainen HelppoJoukko parhaan joukosta, normaali satunnainen laillinen.</summary>
        public static double Hairio(Vastustaja v) => v switch
        {
            Vastustaja.BottiHelppo => 0.35,
            Vastustaja.BottiNormaali => 0.10,
            Vastustaja.BottiVaikea => 0.0,
            _ => throw new ArgumentException("kaveri ei ole botti"),
        };

        /// <summary>Botin kokonainen vuoro heitetylle Tavlille (ei askeleita vielä tehty). Ei muuta peliä: laskee kopiolla,
        /// joten voidaan ajaa taustasäikeessä, kunhan näkymä ei muuta peliä samaan aikaan. Palautettu vuoro on
        /// peli.LaillisetVuorot()-listasta → peli.TeeVuoro(v) tai askel kerrallaan animoituna TeeAskel.</summary>
        public static TavliVuoro Valitse(Tavli peli, Vastustaja taso, Satunnainen sat)
        {
            var vuorot = peli.LaillisetVuorot();
            if (vuorot.Count == 0) throw new InvalidOperationException("ei vuoroja");
            if (vuorot.Count == 1) return vuorot[0];
            int oma = peli.Vuorossa;
            var k = peli.Kopio();
            var jarjestys = new (double Arvo, int I)[vuorot.Count];
            for (int i = 0; i < vuorot.Count; i++)
            {
                Tee(k, oma, vuorot[i]);
                jarjestys[i] = (Arvio(k, oma, W), i);
                Peru(k, oma, vuorot[i]);
            }
            Array.Sort(jarjestys, (x, y) => x.Arvo != y.Arvo ? y.Arvo.CompareTo(x.Arvo) : x.I.CompareTo(y.I));
            if (taso != Vastustaja.BottiVaikea)
            {
                double h = Hairio(taso);
                int joukko = taso == Vastustaja.BottiHelppo ? HelppoJoukko : jarjestys.Length;
                if (h > 0 && sat.Seuraava() < h) return vuorot[jarjestys[(int)(sat.Seuraava() * Math.Min(joukko, jarjestys.Length))].I];
                return vuorot[jarjestys[0].I];
            }
            if (jarjestys[0].Arvo >= Voitto) return vuorot[jarjestys[0].I];
            int m = Math.Min(VaikeaKarsinta, jarjestys.Length);
            double paras = double.NegativeInfinity;
            int parasI = jarjestys[0].I;
            var lista = new List<TavliVuoro>();
            for (int j = 0; j < m; j++)
            {
                double v = Odotusarvo(k, oma, vuorot[jarjestys[j].I], lista, W);
                if (v > paras) { paras = v; parasI = jarjestys[j].I; }
            }
            return vuorot[parasI];
        }

        static void Tee(Tavli k, int p, TavliVuoro v) { foreach (var s in v.Askeleet) k.Siirra(p, s); }
        static void Peru(Tavli k, int p, TavliVuoro v) { for (int i = v.Askeleet.Length - 1; i >= 0; i--) k.Palauta(p, v.Askeleet[i]); }

        /// <summary>Oman vuoron arvo vastustajan 36 heiton keskiarvona; kullakin heitolla vastustajan heuristisesti paras vastaus.</summary>
        static double Odotusarvo(Tavli k, int oma, TavliVuoro v, List<TavliVuoro> lista, TavliPainot w)
        {
            int vast = 1 - oma;
            Tee(k, oma, v);
            double summa = 0;
            if (k.pois[oma] == Tavli.Nappuloita) summa = Voitto * 36;
            else
            {
                for (int a = 1; a <= 6; a++)
                    for (int b = a; b <= 6; b++)
                    {
                        k.Generoi(vast, a, b, lista);
                        double parasVast = double.NegativeInfinity;
                        foreach (var t in lista)
                        {
                            Tee(k, vast, t);
                            double e = Arvio(k, vast, w);
                            Peru(k, vast, t);
                            if (e > parasVast) parasVast = e;
                        }
                        summa += (a == b ? 1 : 2) * -parasVast;
                    }
            }
            Peru(k, oma, v);
            return summa / 36;
        }

        /// <summary>Heuristinen arvio pelaajan p näkökulmasta, kun p on juuri siirtänyt (vastustaja heittää seuraavaksi).</summary>
        public static double Arvio(Tavli t, int p) => Arvio(t, p, W);

        internal static double Arvio(Tavli t, int p, TavliPainot w)
        {
            int v = 1 - p;
            if (t.pois[p] == Tavli.Nappuloita) return Voitto;
            if (t.pois[v] == Tavli.Nappuloita) return -Voitto;
            double arvo = t.Pip(v) - t.Pip(p);
            if (!Kontakti(t)) return arvo + w.KilpaPois * (t.pois[p] - t.pois[v]);
            arvo *= w.Pip;
            arvo += Rakenne(t, p, w) - Rakenne(t, v, w);
            // Palkilla: vastustajan palkki sitä arvokkaampi, mitä useampi oma kotipiste on suljettu.
            int suljP = t.SuljetutSisaantulot(p), suljV = t.SuljetutSisaantulot(v);
            arvo += t.palkki[v] * (w.Palkki + w.PalkkiSuljettu * suljV);
            arvo -= t.palkki[p] * (w.Palkki + w.PalkkiSuljettu * suljP);
            // Omat yksinäiset: osumatodennäköisyys × hinta (pip-menetys + aikahäviö; vahva vastustajan koti nostaa hintaa).
            for (int x = 0; x < Tavli.Pisteita; x++)
            {
                if (t.Omat(p, x) != 1) continue;
                int osumat = Tavli.OsumaTodennakoisyys(t, x, v);
                if (osumat == 0) continue;
                double hinta = w.BlotEdistys * (25 - Tavli.Etaisyys(p, x)) + w.BlotPohja + w.BlotKoti * suljP;
                arvo -= osumat / 36.0 * hinta;
            }
            if (w.VastBlot > 0)
                for (int x = 0; x < Tavli.Pisteita; x++)
                {
                    if (t.Omat(v, x) != 1) continue;
                    int osumat = Tavli.OsumaTodennakoisyys(t, x, p);
                    if (osumat > 0) arvo += w.VastBlot * osumat / 36.0 * (w.BlotEdistys * (25 - Tavli.Etaisyys(v, x)) + w.BlotPohja + w.BlotKoti * suljV);
                }
            arvo += w.Pois * (t.pois[p] - t.pois[v]);
            return arvo;
        }

        /// <summary>Onko nappuloilla vielä kontaktia (vaalean takimmainen on tumman takimmaisen takana).</summary>
        static bool Kontakti(Tavli t)
        {
            int taka0 = t.palkki[0] > 0 ? 24 : -1;
            if (taka0 < 0) for (int x = 23; x >= 0; x--) if (t.lauta[x] > 0) { taka0 = x; break; }
            int taka1 = t.palkki[1] > 0 ? -1 : 24;
            if (taka1 > 23) for (int x = 0; x < 24; x++) if (t.lauta[x] < 0) { taka1 = x; break; }
            return taka0 > taka1;
        }

        /// <summary>Suljetut pisteet (kotialueella ×2, ankkuri vastustajan kotialueella), prime-pituus ja liika kasaus.</summary>
        static double Rakenne(Tavli t, int p, TavliPainot w)
        {
            double r = 0;
            int jono = 0, pisin = 0;
            for (int i = 0; i < Tavli.Pisteita; i++)
            {
                int n = t.Omat(p, i);
                if (n >= 2)
                {
                    r += Tavli.KotiPiste(p, i) ? w.Koti : w.Piste;
                    int e = Tavli.Etaisyys(p, i);
                    if (e == 5 || e == 7) r += w.Avainpiste;
                    if (Tavli.KotiPiste(1 - p, i)) r += w.Ankkuri;
                    if (n > 3) r -= w.Kasa * (n - 3);
                    jono++;
                    if (jono > pisin) pisin = jono;
                }
                else jono = 0;
            }
            if (pisin >= 3) r += (pisin - 2) * (pisin - 2) * w.Prime;
            return r;
        }
    }

    /// <summary>Heuristiikan painot. Kokeiltu (botti vastaan botti, 300–2000 peliä): blotin pohjahinta 10, vahvan
    /// vastustajan kodin lisähinta, 5- ja 7-pisteen lisäpaino, vastustajan blotit, pip 0,7 ja prime 3 — mikään ei
    /// erottunut kohinasta (±1,5 %), joten käytössä perusarvot.</summary>
    internal sealed class TavliPainot
    {
        public double Pip = 1, BlotPohja = 6, BlotEdistys = 1, BlotKoti = 0, Koti = 4, Piste = 2, Avainpiste = 0, Ankkuri = 1.5, Kasa = 0.4,
            Prime = 1.5, Palkki = 3, PalkkiSuljettu = 2, Pois = 0.8, VastBlot = 0, KilpaPois = 1.5;
    }
}
