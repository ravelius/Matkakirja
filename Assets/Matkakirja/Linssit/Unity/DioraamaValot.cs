// DIORAAMAN VALOT (Poikkileikkaus-linssi, Linnanrakentaja erä 2b, 29.9.2026, dioraama-rajapinnat-
// era2b-20260929.md kohdat 1 ja 2): aurinko (Directional, varjot) + tilojen pistevalot (lamput/tuli) oikealla
// URP-valaistuksella DioraamaValaistu.shaderille. Sama elinkaari kuin DioraamaLiekit (luonti/päivitys/tuhoaminen
// DioraamaNayttamo.Luo/Paivita/Tuhoa:sta) -- plain C#-luokka, ei MonoBehaviour, GameObjectit näyttämön juuren alla.
//
// RAKENNUSTASON DATA (Rakennus.Valaistus, Tila.Valot) LUETAAN ILMAN DioraamaSovitin-MUUTOSTA: tämän erän
// DioraamaSovitin.cs-muutokset on rajattu VAIN Komento-metodiin (muut agentit muokkaavat samaa tiedostoa samaan
// aikaan), joten Paivita lukee rakennuksen suoraan DioraamaSovitin.Linssi?.Rakennus- ja kohdetilan
// DioraamaSovitin.ViimeisinNakyma?.KohdeTila-staattisista (molemmat julkisia, jo olemassa, tämän erän
// koskematta). POIKKEAMA kirjattu raporttiin: sisarluokat (Liekit/Hahmot/Rakennus3D) saavat LisaaTila(tila)-
// kutsun TaydennaLataamattomat:sta tila kerrallaan (glb/atlas odottavat verkkoa); pistevalot eivät odota mitään
// verkkoresurssia, joten Valmistele käsittelee KAIKKI rakennuksen tilat kerralla heti kun Rakennus-viite ilmestyy
// tai vaihtuu ("poikki lataa").
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    using V3 = Matkakirja.Linssit.Dioraama.V3;

    public sealed class DioraamaValot
    {
        const float TilaVarjoEtaisyys = 30f, YleisVarjoEtaisyys = 160f;
        const int VarjokarttaResoluutio = 2048;
        static readonly Color LampunOletusVari = new Color(1f, 0.7647f, 0.4118f); // #ffc26a
        static readonly Color AurinkoOletusVari = new Color(1f, 0.9412f, 0.8471f); // #fff0d8
        static readonly Color TaivasYlaOletus = new Color(0.7255f, 0.8039f, 0.8667f); // #b9cddd
        static readonly Color TaivasAlaOletus = new Color(0.3647f, 0.2980f, 0.2353f); // #5d4c3c
        static readonly int IdTaivasYla = Shader.PropertyToID("_DioraamaTaivasYla"), IdTaivasAla = Shader.PropertyToID("_DioraamaTaivasAla");

        sealed class PisteValo
        {
            public GameObject Go;
            public Light Light;
            public double Lepatus;
            public float PerusVoimakkuus;
            public float VaiheSiemen;
            public bool OnTuli;
        }

        readonly Transform juuri;
        readonly List<PisteValo> pisteValot = new List<PisteValo>();
        GameObject aurinkoGo;
        Light aurinkoValo;
        Rakennus viimeisinRakennus;
        string viimeisinKohdeTila = "##ei-asetettu##"; // sentinel: eroaa aina ensimmäisellä Paivita-kutsulla (null == yleisnäkymä on kelvollinen arvo)

        UniversalRenderPipelineAsset urpAsetus;
        bool alkuperaisetTallennettu;
        float alkuShadowDistance;
        int alkuShadowmapResoluutio;
        int alkuLisavaloRaja;
        /// <summary>Lisävaloja per objekti linssin ajan (URP enintään 8): keittiössä tuli, ikkuna, kynttilät ja lamppu.</summary>
        const int LisavaloRaja = 8;
        AmbientMode alkuAmbientMode;
        Color alkuAmbientTaivas, alkuAmbientEkvaattori, alkuAmbientMaa;
        float alkuAmbientVoimakkuus;

        bool aurinkoPaalla = true, lamputPaalla = true, tuliPaalla = true;

        /// <summary>Kytkin "poikki valo aurinko 0|1" (DioraamaSovitin.Komento).</summary>
        public bool Aurinko
        {
            get => aurinkoPaalla;
            set { aurinkoPaalla = value; if (aurinkoValo != null) aurinkoValo.enabled = value; }
        }
        /// <summary>Kytkin "poikki valo lamput 0|1": tilan valot, joilla Lepatus == 0 (öljylamppu, kynttilä).</summary>
        public bool Lamput
        {
            get => lamputPaalla;
            set { lamputPaalla = value; PaivitaPisteValojenTilat(); }
        }
        /// <summary>Kytkin "poikki valo tuli 0|1": tilan valot, joilla Lepatus &gt; 0 (tulisija, KOHTA 1: "tulisijalla lepatus 0,35").</summary>
        public bool Tuli
        {
            get => tuliPaalla;
            set { tuliPaalla = value; PaivitaPisteValojenTilat(); }
        }

        public DioraamaValot(Transform juuri) { this.juuri = juuri; }

        void PaivitaPisteValojenTilat()
        {
            foreach (var p in pisteValot) if (p.Light != null) p.Light.enabled = p.OnTuli ? tuliPaalla : lamputPaalla;
        }

        /// <summary>Joka ruutu (DioraamaNayttamo.Paivita): rakennuksen/kohdetilan tunnistus + lepatus ajasta.
        /// t on Ydin-aika (pysäytettävissä "poikki aika" -komennolla, kuten liekkien ruutu).</summary>
        public void Paivita(double t, bool vahennettyLiike)
        {
            VarmistaUrpAsetus();

            var rakennus = DioraamaSovitin.Linssi?.Rakennus;
            if (rakennus != null && rakennus != viimeisinRakennus) Valmistele(rakennus);

            string kohdeTila = DioraamaSovitin.ViimeisinNakyma?.KohdeTila;
            if (kohdeTila != viimeisinKohdeTila)
            {
                viimeisinKohdeTila = kohdeTila;
                if (urpAsetus != null) urpAsetus.shadowDistance = kohdeTila != null ? TilaVarjoEtaisyys : YleisVarjoEtaisyys;
            }

            foreach (var p in pisteValot)
            {
                if (p.Light == null || p.Lepatus <= 0) continue;
                if (vahennettyLiike) { p.Light.intensity = p.PerusVoimakkuus; continue; }
                float kohina = Mathf.PerlinNoise((float)(t * 1.7) + p.VaiheSiemen, p.VaiheSiemen * 0.37f);
                float taso = Mathf.Lerp(0.7f, 1f, kohina);
                p.Light.intensity = p.PerusVoimakkuus * Mathf.Lerp(1f, taso, (float)p.Lepatus);
            }
        }

        /// <summary>Hakee URP-asetuksen ja tallentaa alkuperäiset arvot TÄSMÄLLEEN kerran (myös kesken latauksen,
        /// jo ennen kuin Rakennus on latautunut): shadowmap-resoluutio nostetaan 2048:aan heti diorama avautuu.</summary>
        void VarmistaUrpAsetus()
        {
            if (alkuperaisetTallennettu) return;
            urpAsetus = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            if (urpAsetus == null) return;
            alkuShadowDistance = urpAsetus.shadowDistance;
            alkuShadowmapResoluutio = urpAsetus.mainLightShadowmapResolution;
            alkuLisavaloRaja = urpAsetus.maxAdditionalLightsCount;
            alkuAmbientMode = RenderSettings.ambientMode;
            alkuAmbientTaivas = RenderSettings.ambientSkyColor;
            alkuAmbientEkvaattori = RenderSettings.ambientEquatorColor;
            alkuAmbientMaa = RenderSettings.ambientGroundColor;
            alkuAmbientVoimakkuus = RenderSettings.ambientIntensity;
            alkuperaisetTallennettu = true;
            urpAsetus.mainLightShadowmapResolution = VarjokarttaResoluutio;
            urpAsetus.maxAdditionalLightsCount = LisavaloRaja;
        }

        /// <summary>Uusi tai vaihtunut Rakennus (ensilataus tai "poikki lataa"): aurinko, taivas ja KAIKKIEN
        /// tilojen pistevalot kerralla. Vanhat pistevalot pois ensin (uudelleenlataus voi tuoda erilaisen listan).</summary>
        void Valmistele(Rakennus rakennus)
        {
            viimeisinRakennus = rakennus;
            foreach (var p in pisteValot) if (p.Go != null) UnityEngine.Object.Destroy(p.Go);
            pisteValot.Clear();

            var valaistus = rakennus.Valaistus;
            LuoAurinko(valaistus?.Aurinko);
            AsetaTaivas(valaistus?.Taivas);
            foreach (var tila in rakennus.Tilat)
            {
                if (tila.Valot == null) continue;
                foreach (var valo in tila.Valot) LuoPisteValo(tila.Id, valo);
            }
        }

        /// <summary>Aurinko (päävalo): suunta atsimuutti/korkeus-kompassiasteista, KANONINEN → Unity (x, y, −z)
        /// kuten Kameraliike.AsentoSijainti + DioraamaNayttamo.UnityPiste. "suunta" osoittaa KOHTEESTA AURINKOON
        /// (sama kaava kuin kameralla); valon transform.forward on tämän VASTALUKU, koska Light säteilee eteenpäin
        /// kohti kohdetta (mainLight.direction URP:ssa on jälleen -forward, jolloin se osoittaa takaisin aurinkoon).</summary>
        void LuoAurinko(Matkakirja.Linssit.Dioraama.Aurinko aurinko)
        {
            if (aurinkoGo == null)
            {
                aurinkoGo = new GameObject("DioraamaAurinko") { layer = DioraamaNayttamo.Kerros };
                aurinkoGo.transform.SetParent(juuri, false);
                aurinkoValo = aurinkoGo.AddComponent<Light>();
                aurinkoValo.type = LightType.Directional;
                aurinkoValo.shadows = LightShadows.Hard; // ei pehmeitä varjoja (Mobile_RPAsset m_SoftShadowsSupported 0)
                aurinkoValo.cullingMask = 1 << DioraamaNayttamo.Kerros;
            }
            double atsimuutti = aurinko?.Atsimuutti ?? 215, korkeus = aurinko?.Korkeus ?? 38;
            double k = korkeus * Math.PI / 180, a = atsimuutti * Math.PI / 180, ck = Math.Cos(k);
            Vector3 suuntaKohtiAurinkoa = DioraamaNayttamo.UnityPiste(new V3(ck * Math.Sin(a), Math.Sin(k), -ck * Math.Cos(a)));
            aurinkoValo.transform.rotation = Quaternion.LookRotation(-suuntaKohtiAurinkoa, Vector3.up);
            aurinkoValo.intensity = (float)(aurinko?.Voima ?? 1.15);
            aurinkoValo.color = TaivasVari(aurinko?.Vari, AurinkoOletusVari);
            aurinkoValo.enabled = aurinkoPaalla;
        }

        /// <summary>Taivaan gradientti globaaleina (DioraamaValaistu.shader: _DioraamaTaivasYla/Ala) + likiarvo
        /// RenderSettings.ambient*-kentille (kohta 2 "RenderSettings.ambient* = taivas") muille materiaaleille.</summary>
        void AsetaTaivas(Matkakirja.Linssit.Dioraama.Taivas taivas)
        {
            Color yla = TaivasVari(taivas?.Yla, TaivasYlaOletus), ala = TaivasVari(taivas?.Ala, TaivasAlaOletus);
            float voima = (float)(taivas?.Voima ?? 0.55);
            Shader.SetGlobalVector(IdTaivasYla, new Vector4(yla.r, yla.g, yla.b, voima));
            Shader.SetGlobalVector(IdTaivasAla, new Vector4(ala.r, ala.g, ala.b, 1f));

            RenderSettings.ambientMode = AmbientMode.Trilight;
            RenderSettings.ambientSkyColor = yla * voima;
            RenderSettings.ambientEquatorColor = Color.Lerp(ala, yla, 0.5f) * voima;
            RenderSettings.ambientGroundColor = ala * voima;
            RenderSettings.ambientIntensity = 1f;
        }

        static Color TaivasVari(string hex, Color oletus) =>
            !string.IsNullOrEmpty(hex) && ColorUtility.TryParseHtmlString(hex, out var v) ? v : oletus;

        /// <summary>Yksi tilan pistevalo (era 2b kohta 1 "TILA.valot"): range = Sade, intensity = Voima · 1,4 (tonemappauksen kanssa; oli 2,2).
        /// Lepatus &gt; 0 luokitellaan "Tuli"-kytkimeen (tulisija), muuten "Lamput"-kytkimeen (öljylamppu/kynttilä)
        /// -- data ei erottele näitä nimellä, vain Lepatuksella (POIKKEAMA/tulkinta, kirjattu raporttiin).</summary>
        void LuoPisteValo(string tilaId, Valo valo)
        {
            var go = new GameObject("Valo:" + tilaId) { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            go.transform.position = DioraamaNayttamo.UnityPiste(valo.Paikka);
            var l = go.AddComponent<Light>();
            l.type = LightType.Point;
            l.range = Mathf.Max(0.05f, (float)valo.Sade);
            l.intensity = (float)(valo.Voima * 1.4);
            l.color = TaivasVari(valo.Vari, LampunOletusVari);
            l.shadows = LightShadows.None; // ei lisävalojen varjoja (Mobile_RPAsset m_AdditionalLightShadowsSupported 0)
            l.cullingMask = 1 << DioraamaNayttamo.Kerros;
            bool onTuli = valo.Lepatus > 0;
            l.enabled = onTuli ? tuliPaalla : lamputPaalla;
            pisteValot.Add(new PisteValo { Go = go, Light = l, Lepatus = valo.Lepatus, PerusVoimakkuus = l.intensity,
                VaiheSiemen = UnityEngine.Random.value * 1000f, OnTuli = onTuli });
        }

        /// <summary>Sulkiessa (DioraamaNayttamo.Tuhoa): valot pois ja KAIKKI alkuperäiset URP/RenderSettings-arvot
        /// takaisin -- myös kesken latauksen (alkuperaisetTallennettu on tosi jo ensimmäisestä Paivita-kutsusta,
        /// ennen kuin Rakennus on koskaan latautunut).</summary>
        public void Tuhoa()
        {
            foreach (var p in pisteValot) if (p.Go != null) UnityEngine.Object.Destroy(p.Go);
            pisteValot.Clear();
            if (aurinkoGo != null) UnityEngine.Object.Destroy(aurinkoGo);
            aurinkoGo = null;
            aurinkoValo = null;
            viimeisinRakennus = null;
            viimeisinKohdeTila = "##ei-asetettu##";

            if (alkuperaisetTallennettu)
            {
                if (urpAsetus != null)
                {
                    urpAsetus.shadowDistance = alkuShadowDistance;
                    urpAsetus.mainLightShadowmapResolution = alkuShadowmapResoluutio;
                    urpAsetus.maxAdditionalLightsCount = alkuLisavaloRaja;
                }
                RenderSettings.ambientMode = alkuAmbientMode;
                RenderSettings.ambientSkyColor = alkuAmbientTaivas;
                RenderSettings.ambientEquatorColor = alkuAmbientEkvaattori;
                RenderSettings.ambientGroundColor = alkuAmbientMaa;
                RenderSettings.ambientIntensity = alkuAmbientVoimakkuus;
            }
            alkuperaisetTallennettu = false;
            urpAsetus = null;
        }
    }
}
