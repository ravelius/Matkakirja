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
        const float SisallaSiirtymaS = 1f; // era2b, omistajan valo-päätös 29.9.: "liukuvat Sisalla-kertoimiin ~1 s:ssa"
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

        // Sisalla-liukuma (era2b, ikkunan aurinko, omistajan valo-päätös 29.9.): aurinko/taivas himmenevät
        // Sisalla-kertoimiin kohdistetussa tilassa ja kirkastuvat takaisin yleisnäkymässä, ~1 s liu'ussa.
        float aurinkoPerusVoima = 1.15f, taivasPerusVoima = 0.55f;
        Color taivasYlaVari = TaivasYlaOletus, taivasAlaVari = TaivasAlaOletus;
        double sisallaAurinkoKerroin = 1, sisallaTaivasKerroin = 1;
        float sisallaTaso; // 0 = yleisnäkymä (ulkona), 1 = kohdistettu tila (sisällä) — MoveTowards Paivita()ssa

        UniversalRenderPipelineAsset urpAsetus;
        bool alkuperaisetTallennettu;
        float alkuShadowDistance;
        int alkuShadowmapResoluutio;
        int alkuLisavaloRaja;
        Light alkuSun;
        readonly List<(Light valo, int maski)> rajatutValot = new List<(Light, int)>();
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
        public void Paivita(double t, bool vahennettyLiike, Camera kamera = null)
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
            // Yleisnäkymän varjoetäisyys seuraa kameraa (Laitetestaaja 29.9., savukierros 1051: iPhonen pystykamera on
            // 300 m päässä, joten kiinteä 160 m karsi kaikki varjot; iPadin vaakakamera 150 m näytti ne): etäisyys
            // linnan keskipisteeseen + 90 m (linnan säde + marginaali), vähintään YleisVarjoEtaisyys. Päivitetään vain
            // > 5 m muutoksella, ettei varjokartta välky nipistyksessä.
            if (kohdeTila == null && urpAsetus != null && kamera != null)
            {
                float haluttu = Mathf.Max(YleisVarjoEtaisyys, Vector3.Distance(kamera.transform.position, juuri.position) + 90f);
                if (Mathf.Abs(urpAsetus.shadowDistance - haluttu) > 5f) urpAsetus.shadowDistance = haluttu;
            }

            if (viimeisinRakennus != null)
            {
                // Sisalla-liukuma: MoveTowards ~1 s:ssa kohti tavoitetta (0 = yleisnäkymä, 1 = kohdistettu
                // tila) — sama kaava kuin muualla natiivissa (Avaruus.cs, ElavatElementit.cs).
                // Ulkotila (erä 3, Tila.Ulkona: laituri, muurinharja) pitää täyden päivänvalon kohdistettunakin.
                bool sisalla = kohdeTila != null && !(viimeisinRakennus.Tilat.Find(x => x.Id == kohdeTila)?.Ulkona ?? false);
                float tavoite = sisalla ? 1f : 0f;
                sisallaTaso = Mathf.MoveTowards(sisallaTaso, tavoite, Time.unscaledDeltaTime / SisallaSiirtymaS);
                if (aurinkoValo != null)
                    aurinkoValo.intensity = aurinkoPerusVoima * Mathf.Lerp(1f, (float)sisallaAurinkoKerroin, sisallaTaso);
                PaivitaTaivasVoima();
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
            // 29.9. diagnoosi: pallon suuntavalo (cullingMask Everything) oli dioraaman PÄÄVALO -- oma aurinko ja
            // lamput eivät vaikuttaneet kuvaan. Linssin ajaksi muut valot rajataan pois näyttämön kerroksesta ja
            // oma aurinko asetetaan RenderSettings.suniksi (Valmistele); palautus Tuhoassa.
            alkuSun = RenderSettings.sun;
            int kerrosBitti = 1 << DioraamaNayttamo.Kerros;
            foreach (var v in UnityEngine.Object.FindObjectsByType<Light>(FindObjectsSortMode.None))
            {
                if (v == null || v.gameObject.layer == DioraamaNayttamo.Kerros || (v.cullingMask & kerrosBitti) == 0) continue;
                rajatutValot.Add((v, v.cullingMask));
                v.cullingMask &= ~kerrosBitti;
            }
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
            // Sisalla ei ole koskaan null DioraamaData.Valaistuksessa (oletus 1/1) -- ?. tässä varautuu
            // vain siihen, että koko Valaistus itse on null (vanha rakennus.json, ei valaistus-kenttää).
            sisallaAurinkoKerroin = valaistus?.Sisalla?.Aurinko ?? 1;
            sisallaTaivasKerroin = valaistus?.Sisalla?.Taivas ?? 1;
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
            RenderSettings.sun = aurinkoValo; // URP valitsee päävalon RenderSettings.sunista
            double atsimuutti = aurinko?.Atsimuutti ?? 215, korkeus = aurinko?.Korkeus ?? 38;
            double k = korkeus * Math.PI / 180, a = atsimuutti * Math.PI / 180, ck = Math.Cos(k);
            Vector3 suuntaKohtiAurinkoa = DioraamaNayttamo.UnityPiste(new V3(ck * Math.Sin(a), Math.Sin(k), -ck * Math.Cos(a)));
            aurinkoValo.transform.rotation = Quaternion.LookRotation(-suuntaKohtiAurinkoa, Vector3.up);
            aurinkoPerusVoima = (float)(aurinko?.Voima ?? 1.15);
            // sisallaTaso: 0 tällä hetkellä (Valmistele nollaa/pysyy vanhassa arvossa vain kesken latauksen
            // uudelleenlataus-tapauksessa) -- Paivita() päivittää tämän joka ruutu Sisalla-kertoimella.
            aurinkoValo.intensity = aurinkoPerusVoima * Mathf.Lerp(1f, (float)sisallaAurinkoKerroin, sisallaTaso);
            aurinkoValo.color = TaivasVari(aurinko?.Vari, AurinkoOletusVari);
            aurinkoValo.enabled = aurinkoPaalla;
        }

        /// <summary>Taivaan väri + peruskirkkaus talteen (era2b: Sisalla-liukuma skaalaa voimaa jatkuvasti,
        /// ks. PaivitaTaivasVoima) ja sovellus heti.</summary>
        void AsetaTaivas(Matkakirja.Linssit.Dioraama.Taivas taivas)
        {
            taivasYlaVari = TaivasVari(taivas?.Yla, TaivasYlaOletus);
            taivasAlaVari = TaivasVari(taivas?.Ala, TaivasAlaOletus);
            taivasPerusVoima = (float)(taivas?.Voima ?? 0.55);
            PaivitaTaivasVoima();
        }

        /// <summary>Soveltaa taivaan NYKYISEN (Sisalla-kertoimella skaalatun) voiman shader-globaaleihin ja
        /// RenderSettings.ambientiin (kohta 2 "RenderSettings.ambient* = taivas"). Kutsutaan asetuksen
        /// vaihtuessa (AsetaTaivas) JA joka ruutu (Paivita), koska Sisalla-liuku muuttaa voimaa jatkuvasti
        /// kohdistetun tilan ja yleisnäkymän välillä (era2b, omistajan valo-päätös 29.9.).</summary>
        void PaivitaTaivasVoima()
        {
            float voima = taivasPerusVoima * Mathf.Lerp(1f, (float)sisallaTaivasKerroin, sisallaTaso);
            Shader.SetGlobalVector(IdTaivasYla, new Vector4(taivasYlaVari.r, taivasYlaVari.g, taivasYlaVari.b, voima));
            Shader.SetGlobalVector(IdTaivasAla, new Vector4(taivasAlaVari.r, taivasAlaVari.g, taivasAlaVari.b, 1f));

            RenderSettings.ambientMode = AmbientMode.Trilight;
            RenderSettings.ambientSkyColor = taivasYlaVari * voima;
            RenderSettings.ambientEquatorColor = Color.Lerp(taivasAlaVari, taivasYlaVari, 0.5f) * voima;
            RenderSettings.ambientGroundColor = taivasAlaVari * voima;
            RenderSettings.ambientIntensity = 1f;
        }

        static Color TaivasVari(string hex, Color oletus) =>
            !string.IsNullOrEmpty(hex) && ColorUtility.TryParseHtmlString(hex, out var v) ? v : oletus;

        /// <summary>Yksi tilan pistevalo (era 2b kohta 1 "TILA.valot"): range = Sade, intensity = Voima · 1,0 (tonemappauksen kanssa; oli 2,2 → 1,4 → 1,0).
        /// Lepatus &gt; 0 luokitellaan "Tuli"-kytkimeen (tulisija), muuten "Lamput"-kytkimeen (öljylamppu/kynttilä)
        /// -- data ei erottele näitä nimellä, vain Lepatuksella (POIKKEAMA/tulkinta, kirjattu raporttiin).
        /// Tyyppi "keila" (era2b, ikkunan aurinko, omistajan valo-päätös 29.9.): LightType.Spot Kohti-pisteeseen
        /// suunnattuna, spotAngle = Kulma, EI varjoja (kuten muutkaan lisävalot) EIKÄ lepatusta.</summary>
        void LuoPisteValo(string tilaId, Valo valo)
        {
            var go = new GameObject("Valo:" + tilaId) { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            go.transform.position = DioraamaNayttamo.UnityPiste(valo.Paikka);
            bool onKeila = valo.Tyyppi == "keila";
            var l = go.AddComponent<Light>();
            l.type = onKeila ? LightType.Spot : LightType.Point;
            l.range = Mathf.Max(0.05f, (float)valo.Sade);
            l.intensity = (float)(valo.Voima * 1.0);
            l.color = TaivasVari(valo.Vari, LampunOletusVari);
            l.shadows = LightShadows.None; // ei lisävalojen varjoja (Mobile_RPAsset m_AdditionalLightShadowsSupported 0) -- koskee myös keilaa
            l.cullingMask = 1 << DioraamaNayttamo.Kerros;
            if (onKeila)
            {
                l.spotAngle = Mathf.Clamp((float)valo.Kulma, 1f, 179f); // Unityn Light.spotAngle-raja
                if (valo.Kohti.HasValue)
                {
                    Vector3 suunta = DioraamaNayttamo.UnityPiste(valo.Kohti.Value) - go.transform.position;
                    if (suunta.sqrMagnitude > 1e-8f) go.transform.rotation = Quaternion.LookRotation(suunta, Vector3.up);
                }
            }
            // "ei lepatusta" (era2b: ikkunan aurinko ei ole tuli/lamppu) -- keila ohittaa datan Lepatuksen.
            double lepatus = onKeila ? 0 : valo.Lepatus;
            bool onTuli = lepatus > 0;
            l.enabled = onTuli ? tuliPaalla : lamputPaalla;
            pisteValot.Add(new PisteValo { Go = go, Light = l, Lepatus = lepatus, PerusVoimakkuus = l.intensity,
                VaiheSiemen = UnityEngine.Random.value * 1000f, OnTuli = onTuli });
        }

        /// <summary>
        /// Olavinlinna (Siirtoseppä 29.9.2026): Blenderin valo:-tyhjä pistevaloksi. Leivotussa tilassa valo on jo
        /// atlaksessa, joten tämä valaisee vain reaaliaikaiset kohteet (3D-pienoisfiguurit) — ne istuvat samaan valoon
        /// kuin huone. extras: vari ("#ffc26a"), sade (m, 4), voima (1), lepatus (0–1, 0). paikka on maailmassa.
        /// </summary>
        public void LisaaTyhja(string tilaId, DioraamaTyhja tyhja, Vector3 paikka)
        {
            // Valmistele tyhjentää pistevalot rakennuksen vaihtuessa: aja se ensin, ettei tyhjän valo katoa perään.
            var rakennus = DioraamaSovitin.Linssi?.Rakennus;
            if (rakennus != null && rakennus != viimeisinRakennus) Valmistele(rakennus);
            var go = new GameObject("Valo:" + tilaId + "/" + tyhja.Id) { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            go.transform.position = paikka;
            var l = go.AddComponent<Light>();
            l.type = LightType.Point;
            l.range = Mathf.Max(0.05f, tyhja.Luku("sade", 4f));
            l.intensity = Mathf.Max(0f, tyhja.Luku("voima", 1f));
            Color vari = LampunOletusVari;
            if (tyhja.Extras != null && tyhja.Extras.TryGetValue("vari", out var v) && v is string hex) ColorUtility.TryParseHtmlString(hex, out vari);
            l.color = vari;
            l.shadows = LightShadows.None;
            l.cullingMask = 1 << DioraamaNayttamo.Kerros;
            double lepatus = Mathf.Clamp01(tyhja.Luku("lepatus", 0f));
            bool onTuli = lepatus > 0;
            l.enabled = onTuli ? tuliPaalla : lamputPaalla;
            pisteValot.Add(new PisteValo { Go = go, Light = l, Lepatus = lepatus, PerusVoimakkuus = l.intensity,
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
            sisallaTaso = 0f;

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
                RenderSettings.sun = alkuSun;
                foreach (var (v, maski) in rajatutValot) if (v != null) v.cullingMask = maski;
                rajatutValot.Clear();
            }
            alkuperaisetTallennettu = false;
            urpAsetus = null;
        }
    }
}
