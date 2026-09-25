using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using CesiumForUnity;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.EnhancedTouch;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace Matkakirja
{
    /// <summary>
    /// PALLON LEPO (Raamattu LÄMPÖ JA VIRRANKULUTUS NATIIVISSA kohta 1, Natiiviseppä 25.9.2026): pallon leposignaali
    /// Pelikoodarin dynaamiselle ruudunpäivitykselle (Ruudunpaivitys.Muuttuu korvaa sillä laattaehtonsa). Pallo lepää, kun
    ///   1) kamera on levossa: PalloKierto.Liikkeessa epätosi eikä kameran paikka, asento, fov tai projektio muuttunut
    ///      tässä kehyksessä (myös siirrot, joita Liikkeessa ei kata, esim. portin linssi ja maastonäytteen rako),
    ///   2) KAIKKI käytössä olevat Cesium3DTilesetit ovat valmiita ja vakaita (ComputeLoadProgress ≥ 99,99 kolmessa
    ///      peräkkäisessä kehyksessä, Lampopaatos.Vakaa),
    ///   3) Laattapalvelin ei ole kiireinen,
    ///   4) herätys (<see cref="Herata"/>, <see cref="Muuttui"/>) on ohi ja
    ///   5) yksikään kartan animaatio (<see cref="Animoi"/>) ei ole käynnissä.
    /// Muuten pallon kuva muuttuu, ja se on piirrettävä joka kehys (Ruudunpaivitys: LEPO 30 fps); levossa piirron saa
    /// harventaa (PAIKALLAAN). Kun pallon kamera on pois (peitto) tai sitä ei ole, pallo lepää: siitä ei piirretä mitään.
    ///
    /// ANIMAATIOT: kaikki, mikä muuttaa kartan kuvaa ilman kameran liikettä (sykkivät merkit, häivytykset, varjostimen
    /// _Time-animaatiot, valon siirtymät), kytketään joko ehtona <see cref="Animoi"/>(ehto, nimi) (OnEnable, ja
    /// <see cref="Poista"/> OnDisable) tai herätyksenä <see cref="Herata"/>(kesto, kuka). Yksittäinen tilamuutos (kerros
    /// päälle, korostus, uusi valinta) = <see cref="Muuttui"/>(kuka): muutama piirretty kehys. Valmistunut lataus tai verkko
    /// (laatat, solut, kalotit) = <see cref="Valmistui"/>(kuka): sama herätys, mutta ei aitoa aktiivisuutta.
    ///
    /// JOUTOSYKE (Fable 25.9. klo 20.1x): tämä laskee myös aidon aktiivisuuden (kosketus, kameran liike, nappulan liike,
    /// Herata ja Muuttui) Joutosykkeelle, joka jäädyttää jatkuvat idle-animaatiot keskiasentoon 3 s levon jälkeen.
    ///
    /// Tila lasketaan kerran kehyksessä (välimuisti Time.frameCountilla): oma LateUpdate (DefaultExecutionOrder 9990)
    /// ennen Ruudunpaivitystä (10000), joten kameran liike on jo tapahtunut, ja laattanäytteet ja kameran vertailu ovat
    /// peräkkäisistä kehyksistä, vaikka Ruudunpaivitys kysyisi vain osan ajasta (TÄYDESSÄ tilassa se ei kysy).
    /// Päätökset ovat puhtaina Lampopaatoksessa (Kartta-testit). Testikomento: `pallo lepo` (Komennot.cs).
    /// </summary>
    [DefaultExecutionOrder(9990)]
    public sealed class PallonLepo : MonoBehaviour
    {
        /// <summary>Yksittäisen tilamuutoksen herätys (s): muutama piirretty kehys 30 fps:llä.</summary>
        public const float MuutosS = 0.25f;
        /// <summary>Pallon kameran palatessa päälle (peiton jälkeen) Cesium valitsee laatat uudelleen: hereillä näin kauan.</summary>
        public const float KameraPaalleS = 0.5f;
        /// <summary>
        /// Animaation jälkeen hereillä vielä näin kauan (s): animaatio asettaa loppuarvonsa usein samassa kehyksessä, jossa
        /// sen ehto sammuu (esim. häivytyksen viimeinen askel), ja lopputila on piirrettävä.
        /// </summary>
        public const float AnimaationJalkiS = 0.1f;
        /// <summary>Tilesetit ja kamera haetaan uudelleen näin monen kehyksen välein (uudet ja poistetut tilesetit).</summary>
        const int HakuVali = 30;

        sealed class Nayte
        {
            public Cesium3DTileset tileset;
            public float nyt = float.NaN, edellinen = float.NaN, toissa = float.NaN;
            public void Lisaa(float a) { toissa = edellinen; edellinen = nyt; nyt = a; }
            public void Nollaa() { nyt = edellinen = toissa = float.NaN; }
        }

        static PallonLepo instanssi;
        static readonly List<(Func<bool> kaynnissa, string nimi)> animaatiot = new List<(Func<bool>, string)>();
        static readonly List<Nayte> naytteet = new List<Nayte>();
        static readonly HashSet<string> kaatuneet = new HashSet<string>();
        static PalloKierto kierto;
        static Camera kamera;
        static Nappula nappula;
        static int laskettu = -1, haettu = -1000, kameraHaettu = -1, syyAste = int.MinValue;
        static string syyKuka;
        static bool lepaa = true, kameraOli, kameraLiikkeessa, nakymaMuuttui, laatatVakaat = true, palvelinKiireinen;
        static float hereillaAsti, animaatioAsti, pieninAste = 100f;
        static string syy = "", herattaja, animaatio, viimeAnimaatio;
        static Lampopaatos.Este este;
        static Vector3 edellinenPaikka;
        static Quaternion edellinenAsento;
        static Matrix4x4 edellinenProjektio;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            instanssi = null;
            animaatiot.Clear();
            naytteet.Clear();
            kaatuneet.Clear();
            kierto = null;
            kamera = null;
            nappula = null;
            laskettu = -1;
            haettu = -1000;
            kameraHaettu = -1;
            lepaa = true;
            kameraOli = kameraLiikkeessa = nakymaMuuttui = palvelinKiireinen = false;
            laatatVakaat = true;
            hereillaAsti = animaatioAsti = 0f;
            pieninAste = 100f;
            syy = "";
            herattaja = animaatio = viimeAnimaatio = syyKuka = null;
            syyAste = int.MinValue;
            este = Lampopaatos.Este.Ei;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (instanssi != null) return;
            var go = new GameObject("PallonLepo");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<PallonLepo>();
        }

        void OnDestroy()
        {
            if (instanssi == this) instanssi = null;
        }

        void LateUpdate() => Laske();

        // ---- Rajapinta ----

        /// <summary>
        /// Lepääkö pallo tässä kehyksessä (tosi = mikään pallossa ei muutu, piirron saa harventaa). syy = ensimmäinen
        /// este ("kamera", "laatat 97 %", "laatat asettuvat", "palvelin", "herätys: kuka", "animaatio: nimi"), levossa "".
        /// Lasketaan kerran kehyksessä; kutsu pääsäikeestä (Ruudunpaivitys.LateUpdate).
        /// </summary>
        public static bool Lepaa(out string syy)
        {
            Laske();
            syy = PallonLepo.syy;
            return lepaa;
        }

        /// <summary>
        /// Pitää pallon hereillä vähintään <paramref name="sekuntia"/> (animaatio, jolla on kesto). Lyhyt herätys ei lyhennä
        /// pidempää (Lampopaatos.Heratys); <paramref name="kuka"/> näkyy syynä. Vaikuttaa jo tähän kehykseen. Aito
        /// aktiivisuus: jäätynyt joutosyke jatkuu heti.
        /// </summary>
        public static void Herata(float sekuntia, string kuka)
        {
            Joutosyke.Merkitse();
            Heratys(sekuntia, kuka);
        }

        /// <summary>Yksittäinen tilamuutos kartalla (kerros päälle tai pois, korostus, uusi valinta): <see cref="MuutosS"/>.</summary>
        public static void Muuttui(string kuka) => Herata(MuutosS, kuka);

        /// <summary>
        /// Valmistunut lataus tai verkko (solut, kalotit, merkit, taustalla rakennettu kerros): muutama piirretty kehys
        /// (<see cref="MuutosS"/>), mutta ei aitoa aktiivisuutta, joten joutosyke ei herää (laattojen lataus ei nollaa kelloa).
        /// </summary>
        public static void Valmistui(string kuka) => Heratys(MuutosS, kuka);

        static void Heratys(float sekuntia, string kuka)
        {
            float uusi = Lampopaatos.Heratys(hereillaAsti, Time.unscaledTime, sekuntia);
            if (uusi <= hereillaAsti) return;
            hereillaAsti = uusi;
            herattaja = kuka;
            // Tämän kehyksen päätös on jo laskettu (kutsu tuli PallonLepon LateUpdaten jälkeen): herätys voimaan heti,
            // mutta ilman uutta laattanäytettä (kolme näytettä = kolme eri kehystä).
            if (laskettu == Time.frameCount && lepaa) Aseta(Lampopaatos.Este.Heratys, herattaja);
        }

        /// <summary>
        /// Rekisteröi kartan animaation: <paramref name="kaynnissa"/> palauttaa tosi, kun kuva muuttuu ilman kameran liikettä
        /// (kutsutaan joka kehys vasta, kun muut ehdot jo lepäävät; pidä halpana). Sama delegaatti (sama olio ja metodi)
        /// vain kerran. Rekisteröi OnEnablessa ja poista OnDisablessa (<see cref="Poista"/>).
        /// </summary>
        public static void Animoi(Func<bool> kaynnissa, string nimi)
        {
            if (kaynnissa == null) return;
            for (int i = 0; i < animaatiot.Count; i++) if (animaatiot[i].kaynnissa == kaynnissa) return;
            animaatiot.Add((kaynnissa, string.IsNullOrEmpty(nimi) ? "?" : nimi));
        }

        /// <summary>Poistaa animaation (sama olio ja metodi kuin <see cref="Animoi"/>-kutsussa).</summary>
        public static void Poista(Func<bool> kaynnissa)
        {
            for (int i = animaatiot.Count - 1; i >= 0; i--) if (animaatiot[i].kaynnissa == kaynnissa) animaatiot.RemoveAt(i);
        }

        /// <summary>
        /// Onko piste (maailman koordinaatit) ruudulla: kameran edessä ja kuvan sisällä <paramref name="reunaPx"/>:n
        /// varalla. Animaatioehdoille (sykkivä merkki ruudun ulkopuolella ei estä lepoa).
        /// </summary>
        public static bool Ruudulla(Camera k, Vector3 piste, float reunaPx)
        {
            if (k == null) return false;
            var r = k.WorldToScreenPoint(piste);
            return r.z > 0f && r.x >= -reunaPx && r.y >= -reunaPx && r.x <= k.pixelWidth + reunaPx && r.y <= k.pixelHeight + reunaPx;
        }

        /// <summary>
        /// Pallon pinnan merkki ruudulla: pallon etupuolella (pinnan normaali kameraan päin, kynnys kuten merkkien
        /// piilotuksessa) ja kuvan sisällä (<see cref="Ruudulla"/>).
        /// </summary>
        public static bool PinnallaRuudulla(Camera k, Vector3 piste, Vector3 normaali, float reunaPx, float kynnys = 0.05f)
        {
            if (k == null) return false;
            Vector3 kohti = k.transform.position - piste;
            float d = kohti.magnitude;
            return d > 0f && Vector3.Dot(normaali, kohti / d) > kynnys && Ruudulla(k, piste, reunaPx);
        }

        /// <summary>Pallon kamera (PalloKierto), tai null ennen kohtausta. Animaatioehdot lukevat tämän.</summary>
        public static Camera Kamera
        {
            get
            {
                if (kamera == null && kameraHaettu != Time.frameCount) EtsiKamera();
                return kamera;
            }
        }

        /// <summary>Tila testikomennolle `pallo lepo`: syy, kamera, laatat, palvelin, herätys ja käynnissä olevat animaatiot.</summary>
        public static string Kuvaus()
        {
            Laske();
            var ic = CultureInfo.InvariantCulture;
            var sb = new StringBuilder("MATKAKIRJA pallo lepo: ");
            sb.Append(lepaa ? "lepää" : "ei lepää (" + syy + ")");
            bool paalla = kamera != null && kamera.isActiveAndEnabled;
            sb.Append("; kamera ").Append(kamera == null ? "puuttuu" : paalla ? "päällä" : "pois (peitto)");
            if (paalla) sb.Append(", liikkeessä ").Append(kameraLiikkeessa ? "kyllä" : "ei").Append(", näkymä muuttui ").Append(nakymaMuuttui ? "kyllä" : "ei");
            sb.Append("; laatat ").Append(naytteet.Count).Append(" tilesettiä, pienin ")
              .Append(float.IsNaN(pieninAste) ? "?" : pieninAste.ToString("0.###", ic)).Append(" %, vakaat ").Append(laatatVakaat ? "kyllä" : "ei");
            foreach (var n in naytteet)
                if (n.tileset != null)
                    sb.Append(" [").Append(n.tileset.name).Append(' ').Append(n.tileset.isActiveAndEnabled ? "" : "pois ")
                      .Append(float.IsNaN(n.nyt) ? "?" : n.nyt.ToString("0.###", ic)).Append(']');
            sb.Append("; palvelin ").Append(palvelinKiireinen ? "kiireinen" : "vapaa");
            float jaljella = hereillaAsti - Time.unscaledTime;
            sb.Append("; herätys ").Append(jaljella > 0f ? jaljella.ToString("0.00", ic) + " s (" + herattaja + ")" : "ohi");
            sb.Append("; ").Append(Joutosyke.Kuvaus());
            sb.Append("; animaatiot ").Append(animaatiot.Count).Append(" rekisteröity, käynnissä:");
            int kaynnissa = 0;
            foreach (var (ehto, nimi) in animaatiot)
                if (Kysy(ehto, nimi)) { sb.Append(' ').Append(nimi); kaynnissa++; }
            if (kaynnissa == 0) sb.Append(" ei yhtään");
            return sb.ToString();
        }

        // ---- Laskenta ----

        static void Laske()
        {
            int kehys = Time.frameCount;
            if (laskettu == kehys) return;
            laskettu = kehys;
            if (kehys - haettu >= HakuVali) Etsi(kehys);
            float nyt = Time.unscaledTime, dt = Time.unscaledDeltaTime;
            // Joutosykkeen aito aktiivisuus: kosketus (myös UI:n päällä) ja nappulan liike; kamera alempana.
            bool aktiivisuus = Kosketetaan() || (nappula != null && nappula.Liikkeessa);

            bool paalla = kamera != null && kamera.isActiveAndEnabled;
            if (!paalla)
            {
                // Pallon kamera pois (peitto, Ruudunpaivitys) tai puuttuu: pallosta ei piirretä mitään. Laattanäytteet
                // alusta, jotta vakaus mitataan paluun jälkeen uudelleen kolmesta kehyksestä.
                if (kameraOli) foreach (var n in naytteet) n.Nollaa();
                kameraOli = kameraLiikkeessa = nakymaMuuttui = false;
                palvelinKiireinen = Laattapalvelin.Kiireinen;
                Joutosyke.Paivita(nyt, dt, aktiivisuus);
                Aseta(Lampopaatos.Este.Ei, null);
                return;
            }
            // Kamera tuli päälle (käynnistys tai peiton loppu): Cesium valitsee laatat uudelleen.
            if (!kameraOli) Herata(KameraPaalleS, "kamera päälle");

            // 1) Kamera: tarkka vertailu (Aseta laskee asennon samoista luvuista, joten levossa arvot ovat samat bitteinä).
            var t = kamera.transform;
            Vector3 paikka = t.position;
            Quaternion asento = t.rotation;
            Matrix4x4 projektio = kamera.projectionMatrix;
            bool asentoMuuttui = !paikka.Equals(edellinenPaikka) || !asento.Equals(edellinenAsento);
            nakymaMuuttui = !kameraOli || asentoMuuttui || !projektio.Equals(edellinenProjektio);
            edellinenPaikka = paikka;
            edellinenAsento = asento;
            edellinenProjektio = projektio;
            kameraOli = true;
            kameraLiikkeessa = kierto != null && kierto.Liikkeessa;
            // Joutosyke ennen animaatioehtoja (ne lukevat Joutosyke.Elaa). Aktiivisuutta on kameran liike, ei pelkkä
            // projektio (maastonäytteen lähitaso muuttuu laattojen latautuessa), eivätkä idle-animaatiot itse.
            Joutosyke.Paivita(nyt, dt, aktiivisuus || kameraLiikkeessa || asentoMuuttui);

            // 2) Laatat: kaikki käytössä olevat tilesetit, kolme näytettä kutakin.
            float aste = 100f;
            bool vakaat = true;
            for (int i = naytteet.Count - 1; i >= 0; i--)
            {
                var n = naytteet[i];
                if (n.tileset == null) { naytteet.RemoveAt(i); continue; }
                if (!n.tileset.isActiveAndEnabled) { n.Nollaa(); continue; }
                n.Lisaa(n.tileset.ComputeLoadProgress());
                aste = Lampopaatos.Pienin(aste, n.nyt);
                vakaat &= Lampopaatos.Vakaa(n.nyt, n.edellinen, n.toissa);
            }
            pieninAste = aste;
            laatatVakaat = vakaat;

            // 3) Palvelin. 4) Herätys. 5) Animaatiot vasta, kun kaikki muu lepää (ehdot ovat halpoja, mutta niitä on monta);
            //    päättyneen animaation lopputila piirretään (AnimaationJalkiS).
            palvelinKiireinen = Laattapalvelin.Kiireinen;
            var e = Lampopaatos.Lepo(!kameraLiikkeessa, nakymaMuuttui, aste, vakaat, palvelinKiireinen, nyt, hereillaAsti, false);
            string kuka = herattaja;
            if (e == Lampopaatos.Este.Ei)
            {
                if (Animoituu(out var nimi))
                {
                    animaatioAsti = nyt + AnimaationJalkiS;
                    viimeAnimaatio = nimi;
                }
                if (nyt < animaatioAsti)
                {
                    e = Lampopaatos.Este.Animaatio;
                    kuka = viimeAnimaatio;
                }
            }
            Aseta(e, kuka);
        }

        static void Aseta(Lampopaatos.Este e, string kuka)
        {
            lepaa = e == Lampopaatos.Este.Ei;
            animaatio = e == Lampopaatos.Este.Animaatio ? kuka : null;
            // Syyteksti uusiksi vain, kun se muuttuu (ei merkkijonoa joka kehys).
            int aste = float.IsNaN(pieninAste) ? -1 : (int)Math.Floor(pieninAste * 100f);
            if (e != este || !ReferenceEquals(kuka, syyKuka) || (e == Lampopaatos.Este.Laatat && aste != syyAste))
                syy = Lampopaatos.Syy(e, pieninAste, kuka);
            este = e;
            syyKuka = kuka;
            syyAste = aste;
        }

        static bool Animoituu(out string nimi)
        {
            for (int i = 0; i < animaatiot.Count; i++)
                if (Kysy(animaatiot[i].kaynnissa, animaatiot[i].nimi)) { nimi = animaatiot[i].nimi; return true; }
            nimi = null;
            return false;
        }

        /// <summary>Animaatioehto turvallisesti: kaatuva ehto (esim. tuhottu olio) = ei käynnissä, varoitus kerran nimeä kohden.</summary>
        static bool Kysy(Func<bool> ehto, string nimi)
        {
            try { return ehto(); }
            catch (Exception ex)
            {
                if (kaatuneet.Add(nimi)) Debug.LogWarning("MATKAKIRJA pallo lepo: animaatioehto " + nimi + " kaatui: " + ex.Message);
                return false;
            }
        }

        /// <summary>Sormi ruudulla (myös UI:n päällä) tai hiiren painike (editori): aitoa aktiivisuutta joutosykkeelle.</summary>
        static bool Kosketetaan()
        {
            if (EnhancedTouchSupport.enabled && Kosketus.activeTouches.Count > 0) return true;
            var hiiri = Mouse.current;
            return hiiri != null && hiiri.leftButton.isPressed;
        }

        /// <summary>Pallon kamera (PalloKierto), enintään kerran kehyksessä.</summary>
        static void EtsiKamera()
        {
            kameraHaettu = Time.frameCount;
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
        }

        /// <summary>Pallon kamera ja tilesetit (uudet mukaan, poistuneet pois; tuttujen historia säilyy).</summary>
        static void Etsi(int kehys)
        {
            haettu = kehys;
            if (kierto == null || kamera == null) EtsiKamera();
            if (nappula == null) nappula = FindAnyObjectByType<Nappula>();
            var kaikki = FindObjectsByType<Cesium3DTileset>(FindObjectsSortMode.None);
            for (int i = naytteet.Count - 1; i >= 0; i--)
                if (naytteet[i].tileset == null || Array.IndexOf(kaikki, naytteet[i].tileset) < 0) naytteet.RemoveAt(i);
            foreach (var t in kaikki)
            {
                bool loytyi = false;
                for (int i = 0; i < naytteet.Count && !loytyi; i++) loytyi = naytteet[i].tileset == t;
                if (!loytyi) naytteet.Add(new Nayte { tileset = t });
            }
        }
    }
}
