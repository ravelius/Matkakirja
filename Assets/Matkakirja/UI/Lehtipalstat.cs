// LEHTIPALSTAT (Natiivi-UI): pitkä nostoteksti kahdelle palstalle, kun tekstin oma leveys on vähintään 600 pt.
//
// Web .lehtipalsta (css/styles.css "@container (min-width: 600px)", js/ui-apurit.js lehtipalstaKotelo ja
// onPitkaNostoteksti): pitkä = vähintään 600 merkkiä tai vähintään kaksi kappaletta. Palstaväli 1,4 rem
// (22,4 pt), vasen tasaus, kappaleväli 0,65 em, viimeisellä ei väliä. Kapeammassa tilassa (puhelin) yksi palsta.
//
// UITK:ssa ei ole column-countia. Palstat ladotaan itse: koko tekstin korkeus palstan leveydellä mitataan,
// vasen palsta täytetään puoliväliin asti (webin tasapalstat: vasen saa ylimääräisen rivin), ja rajalle osuva
// kappale jaetaan sanojen välistä. <link>…</link>-jaksoa ei katkaista kesken (Nostokortti.Korosta).
// Anfangi vain palstoissa (web .lehtipalsta p:first-of-type::first-letter: American Typewriter 700, 3,1 em,
// line-height 0,82, oikealla 0,12 em, rgba(70, 51, 31, 0.9)); UITK ei kelluta, joten anfangin viereiset rivit
// ladotaan kapeampaan palstaan kuten lehden AnfangiKappale.
//
// KYLKIKUVA (web .fokuskohde-teksti > .fokuskohde-nykykuva, omistaja 27.9.2026): säilyneen ihmekohteen nykykuva
// kelluu tekstin (palstoissa ensimmäisen palstan) oikealla: leveys min(42 %, 180 pt), marginaali 3,2 0 8 14,4 pt.
// Rivi asettuu kuvan viereen, jos sen yläreuna on kuvan alamarginaalin yläpuolella (CSS float), ja jatkuu sitten
// täysleveänä. Palstoissa korkeus tasataan hakemalla matalin palstakorkeus, johon teksti mahtuu (column-fill
// balance). Jos teksti loppuu kuvan viereen (lyhyt teksti iPadilla), kortin seuraavat osat siirtyvät kuvan
// viereen niin kauan kuin ne alkavat kuvan alareunan yläpuolelta, kuten webissä.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Lehtipalstat
    {
        /// <summary>Web LEHTIPALSTA_MERKKEJA.</summary>
        public const int Merkkeja = 600;
        /// <summary>Web @container (min-width: 600px).</summary>
        public const float Raja = 600f;
        /// <summary>Web column-gap 1,4 rem.</summary>
        public const float Rako = 22.4f;

        /// <summary>Web onPitkaNostoteksti: vähintään 600 merkkiä tai vähintään kaksi kappaletta.</summary>
        public static bool OnPitka(string teksti, int kappaleita)
        {
            string koko = (teksti ?? "").Trim();
            return koko.Length >= Merkkeja || kappaleita >= 2;
        }

        /// <summary>
        /// Kappaleet (valmis rich text ilman riviväliä) palstoihin. alku = jokaisen tekstin eteen (riviväli),
        /// varusta = jokaiselle luodulle kappaleelle (linkkien kuuntelu).
        /// </summary>
        public static VisualElement Luo(VisualElement isa, IReadOnlyList<string> kappaleet, string alku, string luokka,
            Kirjasin kirjasin, Action<Label> varusta, VisualElement kylki = null, bool palstoita = true,
            float kylkiOsuus = KylkiOsuus, float kylkiKatto = KylkiKatto)
        {
            if (kylki != null) return LuoKylkikuvalla(isa, kappaleet, alku, luokka, kirjasin, varusta, kylki, palstoita, kylkiOsuus, kylkiKatto);
            var kotelo = Rakenne.El("mk-palstat", isa, PickingMode.Ignore);
            // Mittari kantaa kappaleen tyylin (koko, fontti, kappaleväli) ja pysyy piilossa.
            var mittari = Rakenne.Teksti("", luokka, kotelo);
            Kirjasimet.Aseta(mittari, kirjasin);
            mittari.AddToClassList("mk-palstat__mittari");
            var sisus = Rakenne.El("mk-palstat__sisus", kotelo, PickingMode.Ignore);
            var kirjainMittari = Rakenne.Teksti("", "mk-palstat__anfangi mk-palstat__mittari", kotelo);
            kirjainMittari.enableRichText = false;
            Kirjasimet.Aseta(kirjainMittari, Kirjasin.KoneBold);
            float leveys = -1f;

            Label Kappale(VisualElement p, string t)
            {
                var l = Rakenne.Teksti(alku + t, luokka, p);
                Kirjasimet.Aseta(l, kirjasin);
                varusta?.Invoke(l);
                return l;
            }

            void Lado()
            {
                float w = kotelo.contentRect.width;
                if (w <= 0 || float.IsNaN(w) || Mathf.Abs(w - leveys) < 0.5f) return;
                leveys = w;
                sisus.Clear();
                bool kaksi = w >= Raja;
                kotelo.EnableInClassList("mk-palstat--kaksi", kaksi);
                if (!kaksi)
                {
                    foreach (var k in kappaleet) Kappale(sisus, k);
                    return;
                }
                float palsta = Mathf.Floor((w - Rako) / 2f);
                float Korkeus(string s) => mittari.MeasureTextSize(alku + s, palsta, VisualElement.MeasureMode.Exactly, 0,
                    VisualElement.MeasureMode.Undefined).y;
                float vali = mittari.resolvedStyle.marginBottom;
                // Rivin väli (1,58 em), ei yhden rivin korkeutta: ensimmäinen rivi on riviväliä matalampi.
                float rivi = Korkeus("A\nA") - Korkeus("A");
                float koko = mittari.resolvedStyle.fontSize > 0 ? mittari.resolvedStyle.fontSize : 15.5f;
                var anf = Anfangi.Mitoita(kappaleet[0], koko, rivi, kirjainMittari, (s, lev) =>
                    mittari.MeasureTextSize(alku + s, lev, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y, palsta);
                // Ensimmäisen kappaleen (tai sen alkuosan) korkeus anfangin kanssa.
                float Korkeus0(string s) => anf == null ? Korkeus(s) : anf.Korkeus(s);
                int n = kappaleet.Count;
                var h = new float[n];
                float yht = 0f;
                for (int i = 0; i < n; i++) { h[i] = i == 0 ? Korkeus0(kappaleet[i]) : Korkeus(kappaleet[i]); yht += h[i] + (i > 0 ? vali : 0f); }
                float tavoite = yht / 2f + rivi * 0.5f;

                var vasen = new List<string>();
                var oikea = new List<string>();
                float kertyma = 0f;
                int j = 0;
                for (; j < n; j++)
                {
                    float alkuvali = vasen.Count > 0 ? vali : 0f;
                    if (kertyma + alkuvali + h[j] <= tavoite) { vasen.Add(kappaleet[j]); kertyma += alkuvali + h[j]; continue; }
                    // Rajalle osuva kappale jaetaan sanojen välistä: vasemmalle niin monta sanaa kuin mahtuu.
                    var sanat = Sanat(kappaleet[j]);
                    float tila = tavoite - kertyma - alkuvali;
                    int ala = 0, yla = sanat.Count - 1;
                    while (ala < yla)
                    {
                        int keski = (ala + yla + 1) / 2;
                        string osa = string.Join(" ", sanat.GetRange(0, keski));
                        if ((j == 0 ? Korkeus0(osa) : Korkeus(osa)) <= tila) ala = keski; else yla = keski - 1;
                    }
                    if (ala > 0)
                    {
                        vasen.Add(string.Join(" ", sanat.GetRange(0, ala)));
                        oikea.Add(string.Join(" ", sanat.GetRange(ala, sanat.Count - ala)));
                    }
                    else oikea.Add(kappaleet[j]);
                    j++;
                    break;
                }
                for (; j < n; j++) oikea.Add(kappaleet[j]);

                var pv = Rakenne.El("mk-palstat__palsta", sisus, PickingMode.Ignore);
                var po = Rakenne.El("mk-palstat__palsta mk-palstat__palsta--oikea", sisus, PickingMode.Ignore);
                VisualElement viimeinen = null;
                for (int i = 0; i < vasen.Count; i++)
                {
                    viimeinen = i == 0 && anf != null ? anf.Luo(pv, vasen[i], Kappale) : Kappale(pv, vasen[i]);
                    if (i == 0 && anf != null) viimeinen.style.marginBottom = vali;
                }
                if (viimeinen != null) viimeinen.style.marginBottom = 0; // web p:last-child / palstan vaihto kesken kappaleen
                viimeinen = null;
                foreach (var k in oikea) viimeinen = Kappale(po, k);
                if (viimeinen != null) viimeinen.style.marginBottom = 0;
            }

            kotelo.RegisterCallback<GeometryChangedEvent>(_ => Lado());
            return kotelo;
        }

        /// <summary>Web .fokuskohde-nykykuva width min(42 %, 180 px), margin 0,2rem 0 0,5rem 0,9rem.</summary>
        const float KylkiOsuus = 0.42f, KylkiKatto = 180f, KylkiYla = 3.2f, KylkiAla = 8f, KylkiVali = 14.4f;

        /// <summary>Kappaleen osa alueessa: teksti, jatkuuko edellisestä alueesta, anfangi.</summary>
        struct Pala
        {
            public string Teksti;
            public bool Jatko, Anfangi;
        }

        /// <summary>
        /// Teksti ja kelluva kylkikuva (ks. tiedoston alku). palstoita = teksti on pitkä (OnPitka): leveydellä ≥ 600
        /// kaksi palstaa ja anfangi, kuva ensimmäisen palstan oikeassa yläkulmassa; muuten yksi palsta ilman anfangia.
        /// </summary>
        static VisualElement LuoKylkikuvalla(VisualElement isa, IReadOnlyList<string> kappaleet, string alku, string luokka,
            Kirjasin kirjasin, Action<Label> varusta, VisualElement kylki, bool palstoita, float kylkiOsuus, float kylkiKatto)
        {
            var kotelo = Rakenne.El("mk-palstat mk-palstat--kylki", isa, PickingMode.Ignore);
            var mittari = Rakenne.Teksti("", luokka, kotelo);
            Kirjasimet.Aseta(mittari, kirjasin);
            mittari.AddToClassList("mk-palstat__mittari");
            var sisus = Rakenne.El("mk-palstat__sisus", kotelo, PickingMode.Ignore);
            var kirjainMittari = Rakenne.Teksti("", "mk-palstat__anfangi mk-palstat__mittari", kotelo);
            kirjainMittari.enableRichText = false;
            Kirjasimet.Aseta(kirjainMittari, Kirjasin.KoneBold);
            kylki.AddToClassList("mk-palstat__kylki");
            kylki.style.top = KylkiYla;
            kotelo.Add(kylki);
            float leveys = -1f, kylkiKorkeus = -1f, kylkiLeveys = -1f, kuvanAla = 0f;
            VisualElement vieri = null;
            var siirretyt = new List<VisualElement>();
            var mitat = new Dictionary<(string, float), float>();

            Label Kappale(VisualElement p, string t)
            {
                var l = Rakenne.Teksti(alku + t, luokka, p);
                Kirjasimet.Aseta(l, kirjasin);
                varusta?.Invoke(l);
                return l;
            }

            float Korkeus(string t, float lev)
            {
                if (mitat.TryGetValue((t, lev), out var h)) return h;
                h = mittari.MeasureTextSize(alku + t, lev, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y;
                mitat[(t, lev)] = h;
                return h;
            }

            // Kortin seuraavat osat takaisin kotelon perään ennen uutta ladontaa.
            void Palauta()
            {
                var p = kotelo.parent;
                if (p == null) { siirretyt.Clear(); return; }
                int i = p.IndexOf(kotelo) + 1;
                foreach (var e in siirretyt) p.Insert(i++, e);
                siirretyt.Clear();
            }

            void Lado()
            {
                float w = kotelo.contentRect.width;
                if (w <= 0 || float.IsNaN(w)) return;
                bool kaksi = palstoita && w >= Raja;
                float palsta = kaksi ? Mathf.Floor((w - Rako) / 2f) : w;
                // Kylkikuvan leveys: oletus web min(42 %, 180 pt); maakuntakortin minikartta 30 % (Pelikoodari 30.9.2026).
                float kw = Mathf.Round(Mathf.Min(kylkiOsuus * palsta, kylkiKatto) * 10f) / 10f;
                // Verrataan asetettuun arvoon, ei resolvedStyleen: asettelu pyöristää leveyden pikseliruutuun, jolloin
                // vertailu ei koskaan täsmäisi ja ladonta jäisi odottamaan (f0e77501: Olympian teksti puuttui).
                if (Mathf.Abs(kylkiLeveys - kw) > 0.05f)
                {
                    // Kuvan korkeus (kuvatekstin rivitys) selviää vasta tällä leveydellä: odota uutta asettelua.
                    kylkiLeveys = kw;
                    kylki.style.width = kw;
                    kylki.style.left = palsta - kw;
                    return;
                }
                float kh = kylki.layout.height;
                if (float.IsNaN(kh) || kh <= 0 || Mathf.Abs(kylki.layout.width - kw) > 1f) return;
                if (Mathf.Abs(w - leveys) < 0.5f && Mathf.Abs(kh - kylkiKorkeus) < 0.5f) return;
                leveys = w;
                kylkiKorkeus = kh;
                Palauta();
                sisus.Clear();
                vieri = null;
                kotelo.EnableInClassList("mk-palstat--kaksi", kaksi);
                kuvanAla = KylkiYla + kh + KylkiAla;
                float vieriLeveys = Mathf.Max(1f, palsta - kw - KylkiVali);
                float vali = mittari.resolvedStyle.marginBottom;
                float h1 = Korkeus("A", palsta);
                float rivi = Korkeus("A\nA", palsta) - h1;
                float koko = mittari.resolvedStyle.fontSize > 0 ? mittari.resolvedStyle.fontSize : 15.5f;
                var anf = kaksi ? Anfangi.Mitoita(kappaleet[0], koko, rivi, kirjainMittari, Korkeus, vieriLeveys) : null;

                // Alueet: 0 = kuvan vieressä, 1 = kuvan alla (sama palsta), 2 = oikea palsta.
                // Raja on palstan omissa koordinaateissa; kuvan vieressä rivin yläreuna ratkaisee (+ h1).
                float[] alueLeveys = { vieriLeveys, palsta, palsta };
                int[] alueenPalsta = { 0, 0, 1 };
                List<Pala>[] Virtaa(float palstaKorkeus, out float[] palstaKorkeudet)
                {
                    float[] raja = { kuvanAla + h1 - 0.5f, kaksi ? palstaKorkeus : float.PositiveInfinity, float.PositiveInfinity };
                    var palat = new[] { new List<Pala>(), new List<Pala>(), new List<Pala>() };
                    var kertyma = new float[2];
                    var tyhja = new[] { true, true };
                    int a = 0;
                    int alueita = kaksi ? 3 : 2;
                    for (int j = 0; j < kappaleet.Count; j++)
                    {
                        string loput = kappaleet[j];
                        bool jatko = false;
                        while (loput.Length > 0 && a < alueita)
                        {
                            int p = alueenPalsta[a];
                            bool anfangi = anf != null && j == 0 && !jatko && a == 0;
                            float Mitta(string t) => anfangi ? anf.Korkeus(t) : Korkeus(t, alueLeveys[a]);
                            // Jatko samassa palstassa: rivinväli; uusi kappale: kappaleväli; palstan alussa ei väliä.
                            float g = tyhja[p] ? 0f : jatko ? Mathf.Max(0f, rivi - h1) : vali;
                            if (kertyma[p] + g + Mitta(loput) <= raja[a])
                            {
                                palat[a].Add(new Pala { Teksti = loput, Jatko = jatko, Anfangi = anfangi });
                                kertyma[p] += g + Mitta(loput);
                                tyhja[p] = false;
                                loput = "";
                                break;
                            }
                            // Rajalle osuva kappale jaetaan sanojen välistä.
                            var sanat = Sanat(loput);
                            int ala = 0, yla = sanat.Count - 1;
                            while (ala < yla)
                            {
                                int keski = (ala + yla + 1) / 2;
                                if (kertyma[p] + g + Mitta(string.Join(" ", sanat.GetRange(0, keski))) <= raja[a]) ala = keski; else yla = keski - 1;
                            }
                            if (ala > 0)
                            {
                                string osa = string.Join(" ", sanat.GetRange(0, ala));
                                palat[a].Add(new Pala { Teksti = osa, Jatko = jatko, Anfangi = anfangi });
                                kertyma[p] += g + Mitta(osa);
                                tyhja[p] = false;
                                loput = string.Join(" ", sanat.GetRange(ala, sanat.Count - ala));
                                jatko = true;
                            }
                            a++;
                        }
                        if (loput.Length > 0) palat[alueita - 1].Add(new Pala { Teksti = loput, Jatko = jatko });
                    }
                    palstaKorkeudet = kertyma;
                    return palat;
                }

                List<Pala>[] tulos;
                if (kaksi)
                {
                    // Matalin palstakorkeus, jolla oikea palsta ei ylitä sitä (web column-fill: balance).
                    float yht = 0f;
                    foreach (var k in kappaleet) yht += Korkeus(k, palsta) + vali;
                    // Kuva kuuluu vasempaan palstaan: palsta on vähintään kuvan alareunan korkuinen.
                    float ala = kuvanAla, yla = Mathf.Max(kuvanAla, yht) + kuvanAla;
                    for (int i = 0; i < 16 && yla - ala > 0.5f; i++)
                    {
                        float keski = (ala + yla) / 2f;
                        Virtaa(keski, out var kk);
                        if (kk[1] <= keski) yla = keski; else ala = keski;
                    }
                    tulos = Virtaa(yla, out _);
                }
                else tulos = Virtaa(0f, out _);

                VisualElement pv = sisus, po = null;
                if (kaksi)
                {
                    pv = Rakenne.El("mk-palstat__palsta", sisus, PickingMode.Ignore);
                    po = Rakenne.El("mk-palstat__palsta mk-palstat__palsta--oikea", sisus, PickingMode.Ignore);
                }
                // Kelluva kuva varaa korkeutensa, vaikka teksti loppuisi sen vierelle.
                pv.style.minHeight = kuvanAla;
                vieri = Rakenne.El("mk-palstat__vieri", pv, PickingMode.Ignore);
                vieri.style.width = vieriLeveys;
                // Vieri kasvaa siirroista, vaikka palsta (minHeight) ei: kuunnellaan vieriä itseään.
                vieri.RegisterCallback<GeometryChangedEvent>(_ => Siirra());
                VisualElement[] isannat = { vieri, pv, po };
                VisualElement edellinen = null;
                for (int a = 0; a < tulos.Length; a++)
                {
                    if (isannat[a] == null) continue;
                    if (a == 2)
                    {
                        // Palstan viimeinen kappale ilman väliä (web p:last-child / palstan vaihto kesken kappaleen).
                        if (edellinen != null) edellinen.style.marginBottom = 0;
                        edellinen = null;
                    }
                    foreach (var pala in tulos[a])
                    {
                        if (edellinen != null && pala.Jatko) edellinen.style.marginBottom = 0;
                        var e = pala.Anfangi ? anf.Luo(isannat[a], pala.Teksti, Kappale) : Kappale(isannat[a], pala.Teksti);
                        if (pala.Anfangi) e.style.marginBottom = vali;
                        if (pala.Jatko && a == 1 && edellinen != null) e.style.marginTop = Mathf.Max(0f, rivi - h1);
                        edellinen = e;
                    }
                }
                if (edellinen != null) edellinen.style.marginBottom = 0;
                if (vieri.childCount == 0) vieri.style.display = DisplayStyle.None;
            }

            // Lyhyt teksti yhdellä palstalla: kortin seuraavat osat kuvan viereen, kun ne alkavat sen alareunan yläpuolelta.
            void Siirra()
            {
                if (vieri == null || kotelo.ClassListContains("mk-palstat--kaksi") || vieri.childCount == 0) return;
                var p = kotelo.parent;
                if (p == null || sisus.childCount > 1) return; // teksti jatkui kuvan alle
                float h = vieri.layout.height;
                if (float.IsNaN(h) || h >= kuvanAla - 0.5f) return;
                int i = p.IndexOf(kotelo) + 1;
                if (i >= p.childCount) return;
                var seuraava = p[i];
                if (seuraava.resolvedStyle.display == DisplayStyle.None || seuraava.resolvedStyle.position == Position.Absolute) return;
                if (h + seuraava.resolvedStyle.marginTop >= kuvanAla) return;
                vieri.Add(seuraava);
                siirretyt.Add(seuraava);
            }

            kotelo.RegisterCallback<GeometryChangedEvent>(_ => Lado());
            kylki.RegisterCallback<GeometryChangedEvent>(_ => Lado());
            kotelo.RegisterCallback<DetachFromPanelEvent>(_ => siirretyt.Clear());
            return kotelo;
        }

        /// <summary>Anfangi palstan ensimmäiseen kappaleeseen: kirjain, sen viereen mahtuvat sanat ja loput alle.</summary>
        sealed class Anfangi
        {
            string kirjain;
            float iso, rivi, sisennys, top, vieriKorkeus;
            int rivit;
            Func<string, float, float> mittaa;
            float palsta;

            /// <summary>null, kun kappale ei ala kirjaimella (esim. korostuslinkki alussa).</summary>
            public static Anfangi Mitoita(string kappale, float koko, float rivi, Label kirjainMittari, Func<string, float, float> mittaa, float palsta)
            {
                if (string.IsNullOrEmpty(kappale) || !char.IsLetterOrDigit(kappale[0])) return null;
                var a = new Anfangi { kirjain = kappale.Substring(0, 1), rivi = rivi, mittaa = mittaa, palsta = palsta };
                a.iso = 3.1f * koko;
                kirjainMittari.style.fontSize = a.iso;
                // Web kellutuslaatikko 0,06 + 0,82 em: se varaa niin monta tekstiriviä kuin ulottuu.
                a.rivit = Mathf.Max(1, Mathf.CeilToInt(0.88f * a.iso / rivi - 0.05f));
                a.sisennys = kirjainMittari.MeasureTextSize(a.kirjain, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x + 0.12f * a.iso;
                // Anfangin perusviiva viimeisen viereisen rivin perusviivalle (kuten lehden AnfangiKappale).
                a.top = Mathf.Round(Nousu(Kirjasin.Luku) * koko + (a.rivit - 1) * rivi - Nousu(Kirjasin.KoneBold) * a.iso);
                return a;
            }

            /// <summary>Fontin nousu kirjasinkoon osuutena (perusviivan etäisyys rivin yläreunasta).</summary>
            static float Nousu(Kirjasin k)
            {
                var fi = Kirjasimet.Hae(k)?.fontAsset?.faceInfo;
                return fi is UnityEngine.TextCore.FaceInfo f && f.pointSize > 0 ? f.ascentLine / f.pointSize : 0.8f;
            }

            (string Vieressa, string Alla) Jaa(string kappale)
            {
                var sanat = Sanat(kappale.Substring(kirjain.Length));
                float kapea = Mathf.Max(1f, palsta - sisennys);
                vieriKorkeus = mittaa("A" + string.Concat(Enumerable.Repeat("\nA", rivit - 1)), kapea);
                float raja = vieriKorkeus + 0.5f;
                int ala = 0, yla = sanat.Count;
                while (ala < yla)
                {
                    int keski = (ala + yla + 1) / 2;
                    if (mittaa(string.Join(" ", sanat.GetRange(0, keski)), kapea) <= raja) ala = keski; else yla = keski - 1;
                }
                return (string.Join(" ", sanat.GetRange(0, ala)), string.Join(" ", sanat.GetRange(ala, sanat.Count - ala)));
            }

            public float Korkeus(string kappale)
            {
                var (_, alla) = Jaa(kappale);
                // Alaosa alkaa viereisten rivien alta rivivälin päästä (ensimmäinen rivi on riviväliä matalampi).
                return vieriKorkeus + (alla.Length > 0 ? (rivi - mittaa("A", palsta)) + mittaa(alla, palsta) : 0f);
            }

            public VisualElement Luo(VisualElement isa, string kappale, Func<VisualElement, string, Label> teksti)
            {
                var (vieressa, alla) = Jaa(kappale);
                var kpl = Rakenne.El("mk-palstat__anfangikappale", isa, PickingMode.Ignore);
                var k = Rakenne.Teksti(kirjain, "mk-palstat__anfangi", kpl);
                k.enableRichText = false;
                Kirjasimet.Aseta(k, Kirjasin.KoneBold);
                k.style.fontSize = iso;
                k.style.top = top;
                var v = teksti(kpl, vieressa);
                v.style.marginLeft = sisennys;
                v.style.height = vieriKorkeus;
                v.style.marginBottom = 0;
                if (alla.Length > 0)
                {
                    var l = teksti(kpl, alla);
                    l.style.marginBottom = 0;
                    l.style.marginTop = Mathf.Max(0f, rivi - mittaa("A", palsta)); // rivinväli kappaleen sisällä
                }
                return kpl;
            }
        }

        /// <summary>Välilyönnein erotetut sanat; &lt;link&gt;…&lt;/link&gt; ja muut tagit pysyvät ehjinä.</summary>
        static List<string> Sanat(string teksti)
        {
            var tulos = new List<string>();
            var sb = new StringBuilder();
            int linkki = 0;
            bool tagissa = false;
            for (int i = 0; i < teksti.Length; i++)
            {
                char c = teksti[i];
                if (c == '<')
                {
                    if (string.CompareOrdinal(teksti, i, "<link", 0, 5) == 0) linkki++;
                    else if (string.CompareOrdinal(teksti, i, "</link>", 0, 7) == 0) linkki = Math.Max(0, linkki - 1);
                    tagissa = true;
                }
                else if (c == '>') tagissa = false;
                if (c == ' ' && linkki == 0 && !tagissa)
                {
                    if (sb.Length > 0) { tulos.Add(sb.ToString()); sb.Clear(); }
                    continue;
                }
                sb.Append(c);
            }
            if (sb.Length > 0) tulos.Add(sb.ToString());
            return tulos;
        }
    }
}
