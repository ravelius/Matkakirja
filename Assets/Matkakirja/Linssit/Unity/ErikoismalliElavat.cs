// ERIKOISMALLIEN ELÄVÄ AJO (omistaja hyväksyi 22.0x; Mallinsepän rajapinta proto-3d/lokit/mallinseppa-rajapinta.md): lukee
// Symbolimallien julkaisemat liikkuvat osat (Natiiviseppä: osat mallin lapsina Elava-layerilla, lepoasento Pivot) ja asettaa
// niiden asennon Linssisepän liikeytimestä (Ydin/Elava/ErikoisLiike: perusliike, harvinainen tapahtuma, reaktio, yövalot).
// Tivolin säännöt: ruudulla liikkuu enintään 3 mallia (keskustaa lähimmät, hystereesi), vähennetty liike ja Staattinen
// pysäyttävät pehmeästi (0,6 s), ja kun mikään ei liiku, elävä kerros lepää (0 kehystä). Reaktio: kamera alle 60 km:n päässä
// herättää mallin, ja noston löytö (PeliOhjain.NostoLoytyi) käynnistää kohteen kuuluisan hetken. Yö = todellinen paikallinen
// yö kohteessa (Aurinko.AurinkoEcef, aurinko alle −6°).
// Komento: "erikois tila | tapahtuma <avain> | yo 0|1|auto | 0|1".
using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Elava;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    [DefaultExecutionOrder(130)]   // Symbolimallien (120) jälkeen: osien näkyvyys ja jalka tältä kehykseltä
    public sealed class ErikoismalliElavat : MonoBehaviour
    {
        public const float LahellaM = 60_000f, PehmeysS = 0.6f;
        public const int Enintaan = 3;
        /// <summary>Yön raja: auringon korkeus alle −6° (siviilihämärä).</summary>
        static readonly double YoSin = Math.Sin(-6 * Math.PI / 180);

        public static bool Paalla = true;
        /// <summary>Testikomento: null = todellinen yö, true/false = pakotettu.</summary>
        static bool? pakotaYo;

        sealed class Malli
        {
            public string Id, Avain;
            public ErikoisAnimaatio Anim;
            public readonly List<Symbolimallit.LiikkuvaOsa> Osat = new List<Symbolimallit.LiikkuvaOsa>();
            public bool Nakyy, Sallittu, Tapahtuma, Yo, Lahella;
            public float Liike, Avain2, SeuraavaYo;
            public double Etaisyys;
        }

        static ErikoismalliElavat instanssi;
        LinssiOhjain ohjain;
        CesiumGeoreference georeferenssi;
        Camera kamera;
        readonly Dictionary<string, Malli> mallit = new Dictionary<string, Malli>(StringComparer.Ordinal);
        readonly List<Malli> nakyvat = new List<Malli>();
        int versio = -1;
        bool jokinLiikkuu;
        Func<bool> kaynnissa;
        static readonly Comparison<Malli> Jarjestys = (a, b) => a.Avain2.CompareTo(b.Avain2);

        public static void Kytke(LinssiOhjain o)
        {
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null || instanssi != null) return;
            var go = new GameObject("ErikoismalliElavat");
            go.transform.SetParent(kierto.georeferenssi.transform, false);
            instanssi = go.AddComponent<ErikoismalliElavat>();
            instanssi.ohjain = o;
            instanssi.georeferenssi = kierto.georeferenssi;
            instanssi.kamera = kierto.GetComponent<Camera>();
            o.StartCoroutine(instanssi.KytkeLoydot());
        }

        /// <summary>Noston löytö (ensimmäinen avaus) käynnistää kohteen tapahtuman: pelaaja löytää Mont-Saint-Michelin →
        /// kevätvuoksi, Stonehengen → auringonnousu, Colosseumin → velarium.</summary>
        System.Collections.IEnumerator KytkeLoydot()
        {
            while (PeliOhjain.Instanssi == null) yield return null;
            PeliOhjain.Instanssi.NostoLoytyi += t =>
            {
                if (t == null || t.Id == null) return;
                if (mallit.TryGetValue(t.Id, out var m)) m.Tapahtuma = true;
            };
        }

        public static void Testi(string arvo, LinssiOhjain o)
        {
            if (arvo == "0" || arvo == "1") { Paalla = arvo == "1"; PallonLepo.Muuttui("erikoismallit"); }
            else if (arvo != null && arvo.StartsWith("yo ")) pakotaYo = arvo == "yo 1" ? true : arvo == "yo 0" ? false : (bool?)null;
            else if (arvo != null && arvo.StartsWith("tapahtuma ") && instanssi != null)
            {
                string avain = arvo.Substring(10).Trim();
                foreach (var m in instanssi.mallit.Values) if (m.Avain == avain || avain == "kaikki") m.Tapahtuma = true;
            }
            o.Kirjaa("erikoismallit: " + Tila());
        }

        public static string Tila()
        {
            if (instanssi == null) return "ei kytketty";
            var sb = new System.Text.StringBuilder($"{(Paalla ? "päällä" : "pois")}, yö {(pakotaYo.HasValue ? (pakotaYo.Value ? "pakotettu" : "pois") : "todellinen")}, " +
                $"kerros {(instanssi.jokinLiikkuu ? "käy" : "lepää")}");
            foreach (var m in instanssi.mallit.Values)
                sb.Append($"; {m.Avain} {(m.Nakyy ? (m.Sallittu ? "liikkuu" : "odottaa") : "ei näkyvissä")}{(m.Yo ? " yö" : "")}: {m.Anim?.Tila()}");
            return sb.ToString();
        }

        void OnEnable()
        {
            kaynnissa = () => jokinLiikkuu;
            ElavaKerros.Animoi(kaynnissa, "erikoismallit", 30);
        }

        void OnDisable() { if (kaynnissa != null) ElavaKerros.Poista(kaynnissa); }
        void OnDestroy() { if (instanssi == this) instanssi = null; }

        void Rakenna()
        {
            versio = Symbolimallit.LiikkuvatVersio;
            foreach (var m in mallit.Values) m.Osat.Clear();
            var osat = Symbolimallit.LiikkuvatOsat;
            for (int i = 0; i < osat.Count; i++)
            {
                var o = osat[i];
                if (o == null || o.Osa == null || o.Id == null) continue;
                if (!mallit.TryGetValue(o.Id, out var m))
                    mallit[o.Id] = m = new Malli { Id = o.Id, Avain = o.Avain, Anim = ErikoisAnimaatio.Luo(o.Avain, o.Id) };
                m.Osat.Add(o);
            }
            // Kadonneet mallit pois (osat tuhottiin), tila säilyy jäljelle jääneillä.
            var pois = new List<string>();
            foreach (var kv in mallit) if (kv.Value.Osat.Count == 0) pois.Add(kv.Key);
            foreach (var k in pois) mallit.Remove(k);
        }

        void LateUpdate()
        {
            if (kamera == null || georeferenssi == null) return;
            if (Symbolimallit.LiikkuvatVersio != versio) Rakenna();
            float dt = Time.unscaledDeltaTime;
            bool saaLiikkua = Paalla && !ElavaKerros.Staattinen && !(ohjain != null && ohjain.VahennettyLiike);
            var gt = georeferenssi.transform;
            var c0 = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);

            // Näkyvät ja niiden etäisyys ruudun keskeltä; enintään 3 keskustaa lähintä saa liikkua (jo liikkuvaa suositaan).
            nakyvat.Clear();
            foreach (var m in mallit.Values)
            {
                m.Nakyy = false;
                Vector3 jalka = default;
                foreach (var o in m.Osat) if (o.Nakyy) { m.Nakyy = true; jalka = o.Jalka; break; }
                if (!m.Nakyy || m.Anim == null) continue;
                var v = kamera.WorldToViewportPoint(jalka);
                m.Etaisyys = new Vector2(v.x - 0.5f, v.y - 0.5f).magnitude * 2f;
                m.Avain2 = (float)m.Etaisyys * (m.Sallittu ? 0.8f : 1f);
                nakyvat.Add(m);
                // Yö kohteessa: kerran 5 s:ssa auringon korkeudesta (tai testikomennosta).
                m.SeuraavaYo -= dt;
                if (pakotaYo.HasValue) m.Yo = pakotaYo.Value;
                else if (m.SeuraavaYo <= 0f)
                {
                    m.SeuraavaYo = 5f;
                    var ylos = (gt.InverseTransformPoint(jalka) - c0).normalized;
                    var aurinko = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(Aurinko.AurinkoEcef(DateTime.UtcNow));
                    m.Yo = Vector3.Dot(ylos, aurinko.normalized) < YoSin;
                }
                // Reaktio: kamera lähellä mallia herättää sen (liikeytimessä reunana kauko → lähellä).
                m.Lahella = (kamera.transform.position - jalka).magnitude < LahellaM;
            }
            nakyvat.Sort(Jarjestys);
            foreach (var m in mallit.Values) m.Sallittu = false;
            for (int i = 0; i < nakyvat.Count && i < Enintaan; i++) nakyvat[i].Sallittu = true;

            bool jokin = false;
            foreach (var m in nakyvat)
            {
                m.Liike = Mathf.MoveTowards(m.Liike, saaLiikkua && m.Sallittu ? 1f : 0f, dt / PehmeysS);
                var syote = new ErikoisSyote { Liike = m.Liike, Lahella = m.Lahella, Tapahtuma = m.Tapahtuma, Yo = m.Yo };
                m.Tapahtuma = false;
                m.Anim.Paivita(dt, syote);
                if (m.Anim.Liikkuu) jokin = true;
                foreach (var o in m.Osat)
                {
                    var a = m.Anim.Asento(o.Maaritys.Nimi);
                    var t = o.Osa;
                    t.localPosition = o.Maaritys.Pivot + new Vector3((float)a.X, (float)a.Y, (float)a.Z);
                    t.localRotation = new Quaternion((float)a.Qx, (float)a.Qy, (float)a.Qz, (float)a.Qw);
                    t.localScale = Vector3.one * (float)a.Skaala;
                }
            }
            if (jokin != jokinLiikkuu && !jokin) PallonLepo.Muuttui("erikoismallit");
            jokinLiikkuu = jokin;
        }
    }
}
