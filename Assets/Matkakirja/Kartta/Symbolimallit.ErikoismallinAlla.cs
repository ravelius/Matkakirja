using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// KATEGORIASYMBOLIT ERIKOISMALLIN ALLA (Linssisepän speksi 27.9.2026 klo 21.2x, Fablen päätös: yleinen korjaus, nastoja
    /// ei siirretä; geometria ErikoismallinAlla.cs, testit Kartta-testit).
    ///  1. Erikoismalli voittaa: kun tason 1 erikoismalli E näkyy (myös kaupungin maamerkki, Erikoismalli.Kaupunki) ja toisen
    ///     noston N 3D-symbolin laatikko leikkaa E:n kalustelaatikon (sama kuin nimiöiden väistössä, LisaaKalusteet; 28.9.
    ///     laatikkoleikkaus, ennen jalkapiste: Kinderdijkin takarivin päälle jäi Goudan Malja, jonka jalka oli laatikon
    ///     yläpuolella), N:n symboli piilotetaan: tasolla 1 kappale (runko tai lähiverkko, ääriviiva ja maakontakti) lohkon _Tila.y:llä,
    ///     tasoilla 2–3 GPU-instanssin _Tila.y (piilo = 1). Kahteen erikoismalliin sääntö ei koske (N on aina
    ///     kategoriasymboli tai arkkityyppi): niille nykyiset koko- ja lähikynnykset.
    ///  2. Löydettävyys: Natiivi-UI (NostotKartalla) kysyy <see cref="ReunaPiste"/>:llä merkin paikan ja piirtää siihen noston
    ///     merkin pienenä mustepisteenä (≤ 6 pt, tasojen 2–3 minimerkki): laatikon reunapiste, tai noston oma paikka, jos jalka
    ///     on laatikon ulkopuolella (ErikoismallinAlla.MerkinPaikka). Napautus ja nimiö seuraavat merkkiä kuten ennen.
    ///  3. Häivytys 0,3 s ja laatikon 10 %:n hystereesi (ErikoismallinAlla). Kun E piiloutuu (kynnys, kallistus, maa pois,
    ///     piilo), N palaa samalla häivytyksellä.
    /// Tila `symbolit tila` -rivillä ("piilossa erikoismallin alla: vltava→cesky-krumlov, …"), A/B `symbolit alla 0|1` ja
    /// `symbolit alla laatikko|jalka` (laatikkoleikkaus vai 1.0.33:n jalkapiste).
    /// Ei allokaatioita kehyksittäin: tila noston id:llä luodaan kerran (vain kun erikoismalleja on näkyvissä), listat valmiina.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Sääntö päällä (komento `symbolit alla 0|1`, oletus 1).</summary>
        public static bool AllaSaanto = true;
        /// <summary>Symbolin laatikko leikkaa (oletus) vai jalkapiste osuu (1.0.33) — komento `symbolit alla laatikko|jalka`.</summary>
        public static bool AllaLaatikko = true;

        /// <summary>Noston tila erikoismallin alla (noston id:llä).</summary>
        sealed class Alla
        {
            /// <summary>Voittava erikoismalli (null = ei alla) ja sen avain tilariville.</summary>
            public Kappale E;
            public string EAvain;
            /// <summary>Tavoite (piiloon) ja häivytys nyt (0 näkyy … 1 piilossa).</summary>
            public bool Piiloon;
            public float Piilo;
            /// <summary>Noston 3D-symbolin jalka maailmassa viimeisimmästä laskennasta (reunapisteen suunta).</summary>
            public Vector3 Jalka;
            /// <summary>Arvioitu tällä laskentakierroksella; taso 1 tai 2–3 (eri kierrokset: LateUpdate / Laske23).</summary>
            public bool Nahty;
            public int Taso;
        }
        readonly Dictionary<string, Alla> alla = new Dictionary<string, Alla>(StringComparer.Ordinal);

        struct ELaatikko { public Kappale K; public string Avain; public Ruutulaatikko L; }
        /// <summary>Näkyvien erikoismallien kalustelaatikot tältä kehykseltä (ruudun px, y ylös).</summary>
        readonly List<ELaatikko> eLaatikot = new List<ELaatikko>(16);
        float eAllekirjoitus;
        /// <summary>Laatikot muuttuivat edellisestä kehyksestä (tasojen 2–3 laskenta uudelleen, Muuttunut).</summary>
        bool eMuuttui;
        bool laskettuAlla = true, laskettuAllaLaatikko = true;
        /// <summary>Tason 1 häivytys käynnissä (PallonLepo: kuva muuttuu ilman kameran liikettä).</summary>
        bool allaAnimoi;
        bool Haivyttaa() => allaAnimoi;
        MaterialPropertyBlock piiloLohko;
        float edellinen23 = -1f;

        static void NollaaAlla() { AllaSaanto = true; AllaLaatikko = true; }

        /// <summary>Näkyvien erikoismallien laatikot (LateUpdate tason 1 päivityksen jälkeen, ennen nostojen arviointia).</summary>
        void KeraaErikoismallit()
        {
            eLaatikot.Clear();
            float allekirjoitus = 0f;
            if (AllaSaanto)
            {
                float vara = KalusteVaraPt * PalloKierto.Pistekerroin;
                foreach (var p in kappaleet)
                {
                    var k = p.Value;
                    if (k.Malli >= 0 || !k.R.enabled || k.LeveysPx <= 0f) continue;
                    Vector3 r = kamera.WorldToScreenPoint(k.JalkaMaailma);
                    if (r.z <= 0f) continue;
                    var l = ErikoismallinAlla.Kalustelaatikko(r.x, r.y, k.LeveysPx, k.Suhde, vara);
                    eLaatikot.Add(new ELaatikko { K = k, Avain = tiedot.TryGetValue(p.Key, out var t) && t.Erikois != null ? t.Erikois : p.Key, L = l });
                    allekirjoitus += 1f + l.X0 * 1.31f + l.Y0 * 1.73f + l.X1 * 1.97f + l.Y1 * 2.29f;
                }
            }
            eMuuttui = allekirjoitus != eAllekirjoitus;
            eAllekirjoitus = allekirjoitus;
        }

        /// <summary>Tason 1 noston arvio (PaivitaAllaTaso1): symbolin leveys ja korkeussuhde noston kappaleesta.</summary>
        float Arvioi(string id, int taso, Vector3 jalka, float dt, ref bool muuttui, ref bool kesken)
        {
            kappaleet.TryGetValue(id, out var k);
            return Arvioi(id, taso, jalka, k != null ? k.LeveysPx : 0f, k != null ? k.Suhde : 1f, dt, ref muuttui, ref kesken);
        }

        /// <summary>
        /// Arvioi noston N (id, taso, 3D-symbolin jalka maailmassa, symbolin leveys ruudulla px ja korkeussuhde): leikkaako
        /// symbolin laatikko näkyvän erikoismallin laatikon (nykyinen E hystereesillä ensin), ja askeltaa häivytystä. Palauttaa
        /// piilon 0–1; <paramref name="muuttui"/> = tavoite vaihtui, <paramref name="kesken"/> = häivytys jatkuu.
        /// </summary>
        float Arvioi(string id, int taso, Vector3 jalka, float leveysPx, float suhde, float dt, ref bool muuttui, ref bool kesken)
        {
            if (!alla.TryGetValue(id, out var a))
            {
                if (eLaatikot.Count == 0) return 0f;
                alla[id] = a = new Alla();
            }
            a.Nahty = true;
            a.Taso = taso;
            a.Jalka = jalka;
            Kappale e = null;
            string avain = null;
            Vector3 r = kamera.WorldToScreenPoint(jalka);
            if (r.z > 0f)
            {
                var sl = ErikoismallinAlla.SymbolinLaatikko(r.x, r.y, AllaLaatikko ? leveysPx : 0f, suhde);
                if (a.Piiloon && a.E != null)
                    for (int i = 0; i < eLaatikot.Count; i++)
                        if (eLaatikot[i].K == a.E && ErikoismallinAlla.Leikkaa(eLaatikot[i].L, sl, true)) { e = a.E; avain = eLaatikot[i].Avain; break; }
                if (e == null)
                    for (int i = 0; i < eLaatikot.Count; i++)
                        if (ErikoismallinAlla.Leikkaa(eLaatikot[i].L, sl, false)) { e = eLaatikot[i].K; avain = eLaatikot[i].Avain; break; }
            }
            bool piiloon = e != null;
            if (piiloon != a.Piiloon || e != a.E) muuttui = true;
            a.Piiloon = piiloon;
            a.E = e;
            if (avain != null) a.EAvain = avain;
            a.Piilo = ErikoismallinAlla.Haivyta(a.Piilo, piiloon, dt);
            if (a.Piilo != (piiloon ? 1f : 0f)) kesken = true;
            return a.Piilo;
        }

        /// <summary>Kierroksen alku: tason (1 tai 2–3) tilat arvioimattomiksi.</summary>
        void AloitaAlla(bool taso1)
        {
            foreach (var p in alla) if ((p.Value.Taso == 1) == taso1) p.Value.Nahty = false;
        }

        /// <summary>Kierroksen loppu: arvioimatta jääneet (nosto poissa näkyvistä) takaisin näkyviksi ilman häivytystä.</summary>
        bool LopetaAlla(bool taso1)
        {
            bool muuttui = false;
            foreach (var p in alla)
            {
                var a = p.Value;
                if ((a.Taso == 1) != taso1 || a.Nahty || (!a.Piiloon && a.Piilo == 0f)) continue;
                if (a.Piiloon) muuttui = true;
                a.Piiloon = false;
                a.Piilo = 0f;
                a.E = null;
                if (taso1 && kappaleet.TryGetValue(p.Key, out var k)) AsetaPiiloLohkot(k, 0f);
            }
            return muuttui;
        }

        /// <summary>Tason 1 nostot (LateUpdate tason 1 ja maamerkkien jälkeen): arvio, häivytys lohkoon ja näkyvyys.</summary>
        void PaivitaAllaTaso1()
        {
            KeraaErikoismallit();
            bool muuttui = false, kesken = false;
            float dt = Mathf.Min(Time.unscaledDeltaTime, 0.1f);
            AloitaAlla(true);
            foreach (var id in nyt)
            {
                if (!kappaleet.TryGetValue(id, out var k) || k.Malli < 0) continue;
                bool edessa = !float.IsInfinity(k.Etaisyys);
                float piilo = AllaSaanto && edessa ? Arvioi(id, 1, k.JalkaMaailma, dt, ref muuttui, ref kesken) : 0f;
                if (!edessa) continue;
                bool nakyy = piilo < 1f;
                if (k.R.enabled != nakyy) { Nayta(k, nakyy); PallonLepo.Muuttui("symbolimallit"); }
                AsetaPiiloLohkot(k, piilo);
            }
            if (LopetaAlla(true)) muuttui = true;
            allaAnimoi = kesken;
            // Natiivi-UI kysyy ReunaPistettä merkkejä päivittäessään: näytettävät uudelleen, kun joku piiloutuu tai palaa.
            if (muuttui) { NostoKerros.Instanssi?.Herata(); PallonLepo.Muuttui("symbolimallit: erikoismallin alla"); }
        }

        /// <summary>Tason 1 kappaleen piilo lohkoihin (runko, ääriviiva, maakontakti), vain muuttuessa.</summary>
        void AsetaPiiloLohkot(Kappale k, float piilo)
        {
            if (piilo == k.Piilo) return;
            k.Piilo = piilo;
            var tila = new Vector4(0f, piilo, 0f, 0f);
            lohko.SetFloat(HimmeaId, Mathf.Max(0f, k.Himmea));
            lohko.SetVector(TilaLohkoId, tila);
            k.R.SetPropertyBlock(lohko);
            tila.z = Mathf.Max(0f, k.ReunaLeveys);
            reunaLohko.SetVector(TilaLohkoId, tila);
            k.Reuna.SetPropertyBlock(reunaLohko);
            tila.z = 0f;
            piiloLohko.SetVector(TilaLohkoId, tila);
            k.Pohja.SetPropertyBlock(piiloLohko);
            PallonLepo.Muuttui("symbolimallit");
        }

        /// <summary>Tasojen 2–3 kierroksen alku (Laske23): aika-askel edellisestä laskennasta (enintään 0,1 s).</summary>
        float AloitaAlla23()
        {
            float nytS = Time.unscaledTime;
            float dt = edellinen23 < 0f ? 0f : Mathf.Clamp(nytS - edellinen23, 0f, 0.1f);
            edellinen23 = nytS;
            AloitaAlla(false);
            return dt;
        }

        /// <summary>
        /// Natiivi-UI (NostotKartalla): onko noston 3D-symboli piilossa erikoismallin alla, ja reunapiste ruudulla (px, origo
        /// vasen ala kuten NostoKerros.Nosto.Ruutu), johon merkki piirretään mustepisteenä. Lasketaan nykyisellä kameralla.
        /// </summary>
        public static bool ReunaPiste(string nostoId, out Vector2 ruutu)
        {
            ruutu = default;
            var s = instanssi;
            if (s == null || s.kamera == null || nostoId == null || !AllaSaanto || !Paalla) return false;
            if (!s.alla.TryGetValue(nostoId, out var a) || !a.Piiloon || a.E == null || !a.E.R.enabled) return false;
            Vector3 e = s.kamera.WorldToScreenPoint(a.E.JalkaMaailma);
            Vector3 n = s.kamera.WorldToScreenPoint(a.Jalka);
            if (e.z <= 0f) return false;
            var l = ErikoismallinAlla.Kalustelaatikko(e.x, e.y, a.E.LeveysPx, a.E.Suhde, KalusteVaraPt * PalloKierto.Pistekerroin);
            float x, y;
            if (AllaLaatikko) ErikoismallinAlla.MerkinPaikka(l, e.x, e.y, n.x, n.y, out x, out y);
            else ErikoismallinAlla.ReunaPiste(l, e.x, e.y, n.x, n.y, out x, out y);   // 1.0.33 (symbolit alla jalka)
            ruutu = new Vector2(x, y);
            return true;
        }

        /// <summary>`symbolit tila`: "piilossa erikoismallin alla: vltava→cesky-krumlov, hahmotelma-gouda→kinderdijk".</summary>
        void AllaTila(System.Text.StringBuilder sb)
        {
            sb.Append("; piilossa erikoismallin alla:");
            int n = 0;
            foreach (var p in alla)
            {
                if (!p.Value.Piiloon) continue;
                int k = p.Key.LastIndexOf(':');
                sb.Append(n++ == 0 ? " " : ", ").Append(k >= 0 ? p.Key.Substring(k + 1) : p.Key).Append('→').Append(p.Value.EAvain);
            }
            if (n == 0) sb.Append(" ei yhtään");
            if (!AllaSaanto) sb.Append(" (sääntö pois, symbolit alla 0)");
            else if (!AllaLaatikko) sb.Append(" (jalkapiste, symbolit alla jalka)");
        }
    }
}
