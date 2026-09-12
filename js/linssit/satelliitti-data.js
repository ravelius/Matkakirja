/*
 * SATELLIITTILINSSIN HAVAINNOT — KONEELLISESTI TUOTETTU TIEDOSTO.
 *
 * Älä muokkaa käsin: aja tools/hae-satelliittihavainnot.mjs, joka
 * lukee ICEYE Open Data -kokoelman STAC-katalogin, ryhmittelee
 * kuvaukset jalanjäljen mukaan kohteiksi ja tarkistaa jokaisen
 * kuvaosoitteen. Aineisto on CC BY 4.0, tekijä ICEYE; kuvat EIVÄT
 * ole repossa vaan ladataan lähteen omasta ämpäristä.
 *
 * Haettu: 2026-09-12. Kohteita 21, havaintoja 136.
 */

export const SATELLIITTI_LAHDE = {
  "aineisto": "ICEYE Open Data (SAR)",
  "tekija": "ICEYE",
  "lisenssi": "CC BY 4.0",
  "osoite": "https://sar.iceye.com/6.0.6/opendata/opendata/",
  "katalogi": "https://iceye-open-data-catalog.s3.amazonaws.com/collections/iceye-sar.json",
  "haettu": "2026-09-12"
};

export const SATELLIITTI_KOHTEET = [
  {
    "tunnus": "venetsia",
    "nimi": "Venetsia",
    "seutu": "Italia",
    "selite": "Laguunikaupunki tutkan silmin: kanavat ovat mustia, kivitalot valkoisia.",
    "lat": 45.4371,
    "lon": 12.3285,
    "oletus": "ICEYE_U20F2X_20260429T205611Z_9603856_X58_SLH",
    "havainnot": [
      {
        "id": "ICEYE_U20F2R_20251104T222050Z_6901390_X50_SLEDF",
        "aika": "2025-11-04T22:21:04.431Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 31,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          12.2846,
          45.4102,
          12.3641,
          45.4662
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_U20F2R_20251104T222050Z_6901390_X50_SLEDF/ICEYE_U20F2R_20251104T222050Z_6901390_X50_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_U20F2R_20251104T222050Z_6901390_X50_SLEDF.json"
      },
      {
        "id": "ICEYE_U20F2X_20260429T205611Z_9603856_X58_SLH",
        "aika": "2026-04-29T20:56:13.691Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X58",
        "katselukulma": 21.8,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.17.5",
        "alue": [
          12.29,
          45.4067,
          12.3752,
          45.4654
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot/ICEYE_U20F2X_20260429T205611Z_9603856_X58_SLH/ICEYE_U20F2X_20260429T205611Z_9603856_X58_SLH_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_U20F2X_20260429T205611Z_9603856_X58_SLH.json"
      }
    ]
  },
  {
    "tunnus": "krakova",
    "nimi": "Krakova",
    "seutu": "Puola",
    "selite": "Veikselin mutka ja vanhankaupungin rengaspuisto erottuvat yhtenä silmukkana.",
    "lat": 50.0478,
    "lon": 19.9317,
    "oletus": "ICEYE_U2YHTW_20250917T124245Z_6211708_X55_SLEDP",
    "havainnot": [
      {
        "id": "ICEYE_U2YHTW_20250914T185614Z_6182312_X2_SLED",
        "aika": "2025-09-14T18:56:26.625Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 33.5,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          19.8881,
          50.0199,
          19.9757,
          50.0764
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_U2YHTW_20250914T185614Z_6182312_X2_SLED/ICEYE_U2YHTW_20250914T185614Z_6182312_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/09/ICEYE_U2YHTW_20250914T185614Z_6182312_X2_SLED.json"
      },
      {
        "id": "ICEYE_U2YHTW_20250917T124245Z_6211708_X55_SLEDP",
        "aika": "2025-09-17T12:42:56.777Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X55",
        "katselukulma": 30.4,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          19.8879,
          50.0198,
          19.9758,
          50.0765
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-precise/ICEYE_U2YHTW_20250917T124245Z_6211708_X55_SLEDP/ICEYE_U2YHTW_20250917T124245Z_6211708_X55_SLEDP_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/09/ICEYE_U2YHTW_20250917T124245Z_6211708_X55_SLEDP.json"
      },
      {
        "id": "ICEYE_U2YHTW_20251004T200951Z_6407385_X31_SLEDF",
        "aika": "2025-10-04T20:10:04.276Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 37,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          19.8878,
          50.0192,
          19.9755,
          50.0757
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_U2YHTW_20251004T200951Z_6407385_X31_SLEDF/ICEYE_U2YHTW_20251004T200951Z_6407385_X31_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/10/ICEYE_U2YHTW_20251004T200951Z_6407385_X31_SLEDF.json"
      },
      {
        "id": "ICEYE_U2YHTW_20251004T203013Z_6407295_X35_SLEDF",
        "aika": "2025-10-04T20:30:24.031Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X35",
        "katselukulma": 31.1,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          19.8882,
          50.0195,
          19.9751,
          50.0755
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_U2YHTW_20251004T203013Z_6407295_X35_SLEDF/ICEYE_U2YHTW_20251004T203013Z_6407295_X35_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/10/ICEYE_U2YHTW_20251004T203013Z_6407295_X35_SLEDF.json"
      },
      {
        "id": "ICEYE_U2YHTW_20251004T220411Z_6407896_X50_SLEDP",
        "aika": "2025-10-04T22:04:23.513Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 38.7,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          19.8872,
          50.0189,
          19.976,
          50.0761
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-precise/ICEYE_U2YHTW_20251004T220411Z_6407896_X50_SLEDP/ICEYE_U2YHTW_20251004T220411Z_6407896_X50_SLEDP_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/10/ICEYE_U2YHTW_20251004T220411Z_6407896_X50_SLEDP.json"
      }
    ]
  },
  {
    "tunnus": "loch-etive",
    "nimi": "Loch Etiven kapeikko",
    "seutu": "Skotlanti",
    "selite": "Vuoroveden kapeikko, jota on kuvattu päivä toisensa jälkeen: virta piirtyy veteen.",
    "lat": 56.4564,
    "lon": -5.3893,
    "oletus": "ICEYE_GFH1JM_20240506T102612Z_4059688_X2_SLED",
    "havainnot": [
      {
        "id": "ICEYE_GFH1JM_20240504T154336Z_4057645_X13_SLED",
        "aika": "2024-05-04T15:43:43.021Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X13",
        "katselukulma": 21.6,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4437,
          56.4295,
          -5.3461,
          56.4835
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240504T154336Z_4057645_X13_SLED/ICEYE_GFH1JM_20240504T154336Z_4057645_X13_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240504T154336Z_4057645_X13_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240504T162935Z_4057646_X11_SLED",
        "aika": "2024-05-04T16:29:42.521Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X11",
        "katselukulma": 25.2,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4407,
          56.4271,
          -5.3377,
          56.4841
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240504T162935Z_4057646_X11_SLED/ICEYE_GFH1JM_20240504T162935Z_4057646_X11_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240504T162935Z_4057646_X11_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240504T212332Z_4057901_X2_SLED",
        "aika": "2024-05-04T21:23:40.743Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 33.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4374,
          56.43,
          -5.3423,
          56.4827
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240504T212332Z_4057901_X2_SLED/ICEYE_GFH1JM_20240504T212332Z_4057901_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240504T212332Z_4057901_X2_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240505T012421Z_4058088_X23_SLED",
        "aika": "2024-05-05T01:24:28.939Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X23",
        "katselukulma": 33.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4376,
          56.4299,
          -5.3421,
          56.4828
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240505T012421Z_4058088_X23_SLED/ICEYE_GFH1JM_20240505T012421Z_4058088_X23_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240505T012421Z_4058088_X23_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240505T114612Z_4058373_X31_SLED",
        "aika": "2024-05-05T11:46:19.043Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 15.8,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4383,
          56.4272,
          -5.3367,
          56.4835
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240505T114612Z_4058373_X31_SLED/ICEYE_GFH1JM_20240505T114612Z_4058373_X31_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240505T114612Z_4058373_X31_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240505T142004Z_4058439_X23_SLED",
        "aika": "2024-05-05T14:20:12.085Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X23",
        "katselukulma": 25.8,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4427,
          56.4296,
          -5.3459,
          56.4832
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240505T142004Z_4058439_X23_SLED/ICEYE_GFH1JM_20240505T142004Z_4058439_X23_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240505T142004Z_4058439_X23_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240506T025517Z_4059149_X11_SLED",
        "aika": "2024-05-06T02:55:24.343Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X11",
        "katselukulma": 22.6,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4374,
          56.4296,
          -5.34,
          56.4835
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240506T025517Z_4059149_X11_SLED/ICEYE_GFH1JM_20240506T025517Z_4059149_X11_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240506T025517Z_4059149_X11_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240506T102612Z_4059688_X2_SLED",
        "aika": "2024-05-06T10:26:19.699Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 11,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4473,
          56.4297,
          -5.3489,
          56.4843
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240506T102612Z_4059688_X2_SLED/ICEYE_GFH1JM_20240506T102612Z_4059688_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240506T102612Z_4059688_X2_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240506T103108Z_4059717_X8_SLED",
        "aika": "2024-05-06T10:31:14.691Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X8",
        "katselukulma": 23.2,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.44,
          56.4273,
          -5.3379,
          56.4839
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240506T103108Z_4059717_X8_SLED/ICEYE_GFH1JM_20240506T103108Z_4059717_X8_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240506T103108Z_4059717_X8_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240507T023540Z_4060992_X11_SLED",
        "aika": "2024-05-07T02:35:46.981Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X11",
        "katselukulma": 11.4,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4486,
          56.427,
          -5.3475,
          56.4831
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240507T023540Z_4060992_X11_SLED/ICEYE_GFH1JM_20240507T023540Z_4060992_X11_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240507T023540Z_4060992_X11_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240507T102412Z_4061319_X2_SLED",
        "aika": "2024-05-07T10:24:20.022Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 14.1,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4457,
          56.4296,
          -5.3477,
          56.484
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240507T102412Z_4061319_X2_SLED/ICEYE_GFH1JM_20240507T102412Z_4061319_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240507T102412Z_4061319_X2_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240507T161247Z_4061774_X13_SLED",
        "aika": "2024-05-07T16:12:54.58Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X13",
        "katselukulma": 27.8,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4411,
          56.4271,
          -5.3378,
          56.4843
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240507T161247Z_4061774_X13_SLED/ICEYE_GFH1JM_20240507T161247Z_4061774_X13_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240507T161247Z_4061774_X13_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240507T211734Z_4061958_X2_SLED",
        "aika": "2024-05-07T21:17:42.073Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 26.2,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4374,
          56.4297,
          -5.3409,
          56.4832
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240507T211734Z_4061958_X2_SLED/ICEYE_GFH1JM_20240507T211734Z_4061958_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240507T211734Z_4061958_X2_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240508T003452Z_4062174_X25_SLED",
        "aika": "2024-05-08T00:35:01.116Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X25",
        "katselukulma": 38.8,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4378,
          56.4311,
          -5.3488,
          56.4804
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240508T003452Z_4062174_X25_SLED/ICEYE_GFH1JM_20240508T003452Z_4062174_X25_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240508T003452Z_4062174_X25_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240508T003519Z_4062175_X25_SLED",
        "aika": "2024-05-08T00:35:27.89Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X25",
        "katselukulma": 38.7,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4498,
          56.4245,
          -5.337,
          56.4871
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240508T003519Z_4062175_X25_SLED/ICEYE_GFH1JM_20240508T003519Z_4062175_X25_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240508T003519Z_4062175_X25_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240508T021602Z_4062452_X11_SLED",
        "aika": "2024-05-08T02:16:10.994Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X11",
        "katselukulma": 39.5,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4458,
          56.4267,
          -5.3408,
          56.4848
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240508T021602Z_4062452_X11_SLED/ICEYE_GFH1JM_20240508T021602Z_4062452_X11_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240508T021602Z_4062452_X11_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240508T211533Z_4063482_X2_SLED",
        "aika": "2024-05-08T21:15:41.345Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 23.3,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4372,
          56.4296,
          -5.3403,
          56.4833
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240508T211533Z_4063482_X2_SLED/ICEYE_GFH1JM_20240508T211533Z_4063482_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240508T211533Z_4063482_X2_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240508T215510Z_4063547_X31_SLED",
        "aika": "2024-05-08T21:55:17.211Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 18.8,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4464,
          56.4272,
          -5.3445,
          56.4837
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240508T215510Z_4063547_X31_SLED/ICEYE_GFH1JM_20240508T215510Z_4063547_X31_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240508T215510Z_4063547_X31_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240509T103942Z_4064348_X8_SLED",
        "aika": "2024-05-09T10:39:50.358Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X8",
        "katselukulma": 35.7,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4419,
          56.4271,
          -5.3382,
          56.4845
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240509T103942Z_4064348_X8_SLED/ICEYE_GFH1JM_20240509T103942Z_4064348_X8_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240509T103942Z_4064348_X8_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240509T162511Z_4064702_X11_SLED",
        "aika": "2024-05-09T16:25:17.847Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X11",
        "katselukulma": 17.6,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4389,
          56.4272,
          -5.3369,
          56.4837
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240509T162511Z_4064702_X11_SLED/ICEYE_GFH1JM_20240509T162511Z_4064702_X11_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240509T162511Z_4064702_X11_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240510T012539Z_4065165_X23_SLED",
        "aika": "2024-05-10T01:25:47.504Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X23",
        "katselukulma": 36.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4447,
          56.426,
          -5.3353,
          56.4866
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240510T012539Z_4065165_X23_SLED/ICEYE_GFH1JM_20240510T012539Z_4065165_X23_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240510T012539Z_4065165_X23_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240510T012606Z_4065166_X23_SLED",
        "aika": "2024-05-10T01:26:15.27Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X23",
        "katselukulma": 36.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.434,
          56.4319,
          -5.3459,
          56.4807
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240510T012606Z_4065166_X23_SLED/ICEYE_GFH1JM_20240510T012606Z_4065166_X23_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240510T012606Z_4065166_X23_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240510T013629Z_4065081_X19_SLED",
        "aika": "2024-05-10T01:36:37.163Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X19",
        "katselukulma": 32.1,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4377,
          56.4298,
          -5.3417,
          56.4829
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240510T013629Z_4065081_X19_SLED/ICEYE_GFH1JM_20240510T013629Z_4065081_X19_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240510T013629Z_4065081_X19_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240510T101130Z_4065672_X8_SLED",
        "aika": "2024-05-10T10:11:36.336Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X8",
        "katselukulma": 13.1,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.446,
          56.4297,
          -5.3481,
          56.484
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240510T101130Z_4065672_X8_SLED/ICEYE_GFH1JM_20240510T101130Z_4065672_X8_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240510T101130Z_4065672_X8_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240510T142705Z_4065750_X19_SLED",
        "aika": "2024-05-10T14:27:13.43Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X19",
        "katselukulma": 37.7,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4409,
          56.4299,
          -5.3458,
          56.4826
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240510T142705Z_4065750_X19_SLED/ICEYE_GFH1JM_20240510T142705Z_4065750_X19_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240510T142705Z_4065750_X19_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240510T160528Z_4065958_X11_SLED",
        "aika": "2024-05-10T16:05:34.846Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X11",
        "katselukulma": 17.4,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4447,
          56.4295,
          -5.3467,
          56.4838
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240510T160528Z_4065958_X11_SLED/ICEYE_GFH1JM_20240510T160528Z_4065958_X11_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240510T160528Z_4065958_X11_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240510T211130Z_4066324_X2_SLED",
        "aika": "2024-05-10T21:11:37.795Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 17.3,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4365,
          56.4296,
          -5.3388,
          56.4837
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240510T211130Z_4066324_X2_SLED/ICEYE_GFH1JM_20240510T211130Z_4066324_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240510T211130Z_4066324_X2_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240511T011945Z_4066366_X25_SLED",
        "aika": "2024-05-11T01:19:53.365Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X25",
        "katselukulma": 33.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.445,
          56.4257,
          -5.3344,
          56.487
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240511T011945Z_4066366_X25_SLED/ICEYE_GFH1JM_20240511T011945Z_4066366_X25_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240511T011945Z_4066366_X25_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240511T012013Z_4066367_X25_SLED",
        "aika": "2024-05-11T01:20:21.424Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X25",
        "katselukulma": 33.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4347,
          56.4315,
          -5.3449,
          56.4812
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240511T012013Z_4066367_X25_SLED/ICEYE_GFH1JM_20240511T012013Z_4066367_X25_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240511T012013Z_4066367_X25_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240511T025040Z_4066541_X11_SLED",
        "aika": "2024-05-11T02:50:47.145Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X11",
        "katselukulma": 14.2,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4359,
          56.4296,
          -5.3376,
          56.4841
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240511T025040Z_4066541_X11_SLED/ICEYE_GFH1JM_20240511T025040Z_4066541_X11_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240511T025040Z_4066541_X11_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240511T101606Z_4067281_X2_SLED",
        "aika": "2024-05-11T10:16:13.883Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 25.9,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4426,
          56.4297,
          -5.3461,
          56.4832
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240511T101606Z_4067281_X2_SLED/ICEYE_GFH1JM_20240511T101606Z_4067281_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240511T101606Z_4067281_X2_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20240511T161957Z_4068088_X13_SLED",
        "aika": "2024-05-11T16:20:05.772Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X13",
        "katselukulma": 36.8,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4424,
          56.4268,
          -5.3379,
          56.4847
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_GFH1JM_20240511T161957Z_4068088_X13_SLED/ICEYE_GFH1JM_20240511T161957Z_4068088_X13_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/05/ICEYE_GFH1JM_20240511T161957Z_4068088_X13_SLED.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260416T162219Z_9517115_X38_SLEDF",
        "aika": "2026-04-16T16:22:26.942Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X38",
        "katselukulma": 27.6,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.435,
          56.4277,
          -5.3312,
          56.4852
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260416T162219Z_9517115_X38_SLEDF/ICEYE_GFH1JM_20260416T162219Z_9517115_X38_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260416T162219Z_9517115_X38_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260416T215517Z_9519609_X42_SLEDF",
        "aika": "2026-04-16T21:55:26.6Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 33.4,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4397,
          56.4275,
          -5.3349,
          56.4855
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260416T215517Z_9519609_X42_SLEDF/ICEYE_GFH1JM_20260416T215517Z_9519609_X42_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260416T215517Z_9519609_X42_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260416T221948Z_9519182_X31_SLEDF",
        "aika": "2026-04-16T22:19:55.564Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 22.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4309,
          56.4304,
          -5.3339,
          56.4841
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260416T221948Z_9519182_X31_SLEDF/ICEYE_GFH1JM_20260416T221948Z_9519182_X31_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260416T221948Z_9519182_X31_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260417T093903Z_9523321_X50_SLEDF",
        "aika": "2026-04-17T09:39:11.285Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 22.9,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4399,
          56.4277,
          -5.3368,
          56.4849
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260417T093903Z_9523321_X50_SLEDF/ICEYE_GFH1JM_20260417T093903Z_9523321_X50_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260417T093903Z_9523321_X50_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260417T144707Z_9525028_X55_SLEDF",
        "aika": "2026-04-17T14:47:17.514Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X55",
        "katselukulma": 39.6,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4368,
          56.4273,
          -5.3311,
          56.4858
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260417T144707Z_9525028_X55_SLEDF/ICEYE_GFH1JM_20260417T144707Z_9525028_X55_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260417T144707Z_9525028_X55_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260417T215039Z_9527255_X31_SLEDF",
        "aika": "2026-04-17T21:50:45.938Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 29.6,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4391,
          56.428,
          -5.3361,
          56.485
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260417T215039Z_9527255_X31_SLEDF/ICEYE_GFH1JM_20260417T215039Z_9527255_X31_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260417T215039Z_9527255_X31_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260417T220357Z_9526677_X42_SLEDF",
        "aika": "2026-04-17T22:04:05.548Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 22.8,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.44,
          56.4277,
          -5.3367,
          56.4849
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260417T220357Z_9526677_X42_SLEDF/ICEYE_GFH1JM_20260417T220357Z_9526677_X42_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260417T220357Z_9526677_X42_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260417T222715Z_9526883_X61_SLEDF",
        "aika": "2026-04-17T22:27:23.689Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X61",
        "katselukulma": 39,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.431,
          56.4309,
          -5.3366,
          56.4832
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260417T222715Z_9526883_X61_SLEDF/ICEYE_GFH1JM_20260417T222715Z_9526883_X61_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260417T222715Z_9526883_X61_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260418T172225Z_9531593_X63_SLEDF",
        "aika": "2026-04-18T17:22:34.673Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X63",
        "katselukulma": 31.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4312,
          56.4306,
          -5.3355,
          56.4836
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260418T172225Z_9531593_X63_SLEDF/ICEYE_GFH1JM_20260418T172225Z_9531593_X63_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260418T172225Z_9531593_X63_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260418T225320Z_9532957_X50_SLEDF",
        "aika": "2026-04-18T22:53:30.602Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 45.2,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.433,
          56.4313,
          -5.3403,
          56.4827
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260418T225320Z_9532957_X50_SLEDF/ICEYE_GFH1JM_20260418T225320Z_9532957_X50_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260418T225320Z_9532957_X50_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260419T001428Z_9533317_X55_SLEDF",
        "aika": "2026-04-19T00:14:37.897Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X55",
        "katselukulma": 38.5,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4397,
          56.4273,
          -5.3341,
          56.4858
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260419T001428Z_9533317_X55_SLEDF/ICEYE_GFH1JM_20260419T001428Z_9533317_X55_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260419T001428Z_9533317_X55_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260419T011547Z_9533591_X52_SLEDF",
        "aika": "2026-04-19T01:15:57.876Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X52",
        "katselukulma": 44.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4305,
          56.4313,
          -5.3377,
          56.4827
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260419T011547Z_9533591_X52_SLEDF/ICEYE_GFH1JM_20260419T011547Z_9533591_X52_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260419T011547Z_9533591_X52_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260419T121302Z_9535731_X44_SLEDF",
        "aika": "2026-04-19T12:13:10.362Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X44",
        "katselukulma": 25.1,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4346,
          56.4277,
          -5.3311,
          56.485
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260419T121302Z_9535731_X44_SLEDF/ICEYE_GFH1JM_20260419T121302Z_9535731_X44_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260419T121302Z_9535731_X44_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260419T225017Z_9537341_X35_SLEDF",
        "aika": "2026-04-19T22:50:23.195Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X35",
        "katselukulma": 26.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4313,
          56.4304,
          -5.3345,
          56.484
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260419T225017Z_9537341_X35_SLEDF/ICEYE_GFH1JM_20260419T225017Z_9537341_X35_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260419T225017Z_9537341_X35_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260419T225856Z_9537645_X50_SLEDF",
        "aika": "2026-04-19T22:59:06.276Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 39.7,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4339,
          56.431,
          -5.3399,
          56.4831
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260419T225856Z_9537645_X50_SLEDF/ICEYE_GFH1JM_20260419T225856Z_9537645_X50_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260419T225856Z_9537645_X50_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260420T002015Z_9537755_X55_SLEDF",
        "aika": "2026-04-20T00:20:24.642Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X55",
        "katselukulma": 32.3,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4397,
          56.4275,
          -5.335,
          56.4854
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260420T002015Z_9537755_X55_SLEDF/ICEYE_GFH1JM_20260420T002015Z_9537755_X55_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260420T002015Z_9537755_X55_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260420T113145Z_9539986_X42_SLEDF",
        "aika": "2026-04-20T11:31:54.264Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 31.3,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4353,
          56.4306,
          -5.3395,
          56.4836
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260420T113145Z_9539986_X42_SLEDF/ICEYE_GFH1JM_20260420T113145Z_9539986_X42_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260420T113145Z_9539986_X42_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260420T121801Z_9540046_X44_SLEDF",
        "aika": "2026-04-20T12:18:10.693Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X44",
        "katselukulma": 31.4,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4356,
          56.4276,
          -5.3312,
          56.4854
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260420T121801Z_9540046_X44_SLEDF/ICEYE_GFH1JM_20260420T121801Z_9540046_X44_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260420T121801Z_9540046_X44_SLEDF.json"
      },
      {
        "id": "ICEYE_GFH1JM_20260420T135127Z_9540172_X56_SLEDF",
        "aika": "2026-04-20T13:51:36.845Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X56",
        "katselukulma": 37.4,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -5.4343,
          56.4308,
          -5.3396,
          56.4833
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_GFH1JM_20260420T135127Z_9540172_X56_SLEDF/ICEYE_GFH1JM_20260420T135127Z_9540172_X56_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_GFH1JM_20260420T135127Z_9540172_X56_SLEDF.json"
      }
    ]
  },
  {
    "tunnus": "kastrup",
    "nimi": "Kastrup",
    "seutu": "Kööpenhamina, Tanska",
    "selite": "Lentoaseman kiitoradat ja Juutinrauman ranta saman ruudun sisällä.",
    "lat": 55.5868,
    "lon": 12.7842,
    "oletus": "ICEYE_U3CH4Z_20251105T204747Z_6914850_X42_SLF3L",
    "havainnot": [
      {
        "id": "ICEYE_U3CH4Z_20251024T224144Z_6733322_X50_SLF",
        "aika": "2025-10-24T22:41:51.925Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 37,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          12.7431,
          55.5636,
          12.8252,
          55.6101
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-fine/ICEYE_U3CH4Z_20251024T224144Z_6733322_X50_SLF/ICEYE_U3CH4Z_20251024T224144Z_6733322_X50_SLF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/10/ICEYE_U3CH4Z_20251024T224144Z_6733322_X50_SLF.json"
      },
      {
        "id": "ICEYE_U3CH4Z_20251105T204747Z_6914850_X42_SLF3L",
        "aika": "2025-11-05T20:47:51.562Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 32.9,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          12.7331,
          55.5579,
          12.8352,
          55.6157
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-fine/ICEYE_U3CH4Z_20251105T204747Z_6914850_X42_SLF3L/ICEYE_U3CH4Z_20251105T204747Z_6914850_X42_SLF3L_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_U3CH4Z_20251105T204747Z_6914850_X42_SLF3L.json"
      }
    ]
  },
  {
    "tunnus": "hoek-van-holland",
    "nimi": "Hoek van Holland",
    "seutu": "Alankomaat",
    "selite": "Rotterdamin sataman suuaukko, jossa aallonmurtajat työntyvät mereen.",
    "lat": 51.9495,
    "lon": 4.1457,
    "oletus": "ICEYE_U14ZW3_20240904T003536Z_4228243_X38_SLEDP",
    "havainnot": [
      {
        "id": "ICEYE_U14ZW3_20240904T003536Z_4228243_X38_SLEDP",
        "aika": "2024-09-04T00:35:46.824Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X38",
        "katselukulma": 31.7,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          4.0992,
          51.9211,
          4.1914,
          51.9781
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-precise/ICEYE_U14ZW3_20240904T003536Z_4228243_X38_SLEDP/ICEYE_U14ZW3_20240904T003536Z_4228243_X38_SLEDP_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/09/ICEYE_U14ZW3_20240904T003536Z_4228243_X38_SLEDP.json"
      },
      {
        "id": "ICEYE_U14ZW3_20260817T110512Z_10328858_X61_SLEDP",
        "aika": "2026-08-17T11:05:20.471Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X61",
        "katselukulma": 35.5,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.18",
        "alue": [
          4.1002,
          51.9211,
          4.192,
          51.9778
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-precise/ICEYE_U14ZW3_20260817T110512Z_10328858_X61_SLEDP/ICEYE_U14ZW3_20260817T110512Z_10328858_X61_SLEDP_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/08/ICEYE_U14ZW3_20260817T110512Z_10328858_X61_SLEDP.json"
      }
    ]
  },
  {
    "tunnus": "faro",
    "nimi": "Faro",
    "seutu": "Portugali",
    "selite": "Ria Formosan laguuni ja sen hiekkasärkät Algarven rannikolla.",
    "lat": 37.0035,
    "lon": -7.9157,
    "oletus": "ICEYE_EYD6EB_20251109T112335Z_6984583_X47_SLED",
    "havainnot": [
      {
        "id": "ICEYE_EYD6EB_20251106T133425Z_6923995_X47_SLF3L",
        "aika": "2025-11-06T13:34:29.827Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X47",
        "katselukulma": 31.9,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          -7.9546,
          36.9723,
          -7.8768,
          37.0347
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-fine/ICEYE_EYD6EB_20251106T133425Z_6923995_X47_SLF3L/ICEYE_EYD6EB_20251106T133425Z_6923995_X47_SLF3L_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_EYD6EB_20251106T133425Z_6923995_X47_SLF3L.json"
      },
      {
        "id": "ICEYE_EYD6EB_20251109T112335Z_6984583_X47_SLED",
        "aika": "2025-11-09T11:23:49.049Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X47",
        "katselukulma": 30.5,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          -7.9529,
          36.9737,
          -7.8785,
          37.0334
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_EYD6EB_20251109T112335Z_6984583_X47_SLED/ICEYE_EYD6EB_20251109T112335Z_6984583_X47_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_EYD6EB_20251109T112335Z_6984583_X47_SLED.json"
      }
    ]
  },
  {
    "tunnus": "teneriffa",
    "nimi": "Teneriffa",
    "seutu": "Kanariansaaret",
    "selite": "Sama saari kuvattuna joka yö kolmen viikon ajan — tutkan aikasarja.",
    "lat": 28.2343,
    "lon": -16.7097,
    "oletus": "ICEYE_ETH0SK_20260226T021339Z_8992815_X53_SM",
    "havainnot": [
      {
        "id": "ICEYE_ETH0SV_20260211T021259Z_8798324_X53_SM",
        "aika": "2026-02-11T02:13:04.543Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9644,
          27.9057,
          -16.4569,
          28.5627
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SV_20260211T021259Z_8798324_X53_SM/ICEYE_ETH0SV_20260211T021259Z_8798324_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SV_20260211T021259Z_8798324_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SV_20260212T021302Z_8807573_X53_SM",
        "aika": "2026-02-12T02:13:07.236Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.965,
          27.9059,
          -16.4573,
          28.5629
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SV_20260212T021302Z_8807573_X53_SM/ICEYE_ETH0SV_20260212T021302Z_8807573_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SV_20260212T021302Z_8807573_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0ST_20260213T021305Z_8818363_X53_SM",
        "aika": "2026-02-13T02:13:10.039Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.9,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9666,
          27.9053,
          -16.4589,
          28.5617
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0ST_20260213T021305Z_8818363_X53_SM/ICEYE_ETH0ST_20260213T021305Z_8818363_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0ST_20260213T021305Z_8818363_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0ST_20260214T021307Z_8833917_X53_SM",
        "aika": "2026-02-14T02:13:12.965Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9681,
          27.9053,
          -16.4603,
          28.5621
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0ST_20260214T021307Z_8833917_X53_SM/ICEYE_ETH0ST_20260214T021307Z_8833917_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0ST_20260214T021307Z_8833917_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0ST_20260215T021311Z_8845141_X53_SM",
        "aika": "2026-02-15T02:13:16.009Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9708,
          27.9048,
          -16.4628,
          28.5614
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0ST_20260215T021311Z_8845141_X53_SM/ICEYE_ETH0ST_20260215T021311Z_8845141_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0ST_20260215T021311Z_8845141_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SS_20260216T021313Z_8850410_X53_SM",
        "aika": "2026-02-16T02:13:18.976Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9725,
          27.9039,
          -16.4645,
          28.5603
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SS_20260216T021313Z_8850410_X53_SM/ICEYE_ETH0SS_20260216T021313Z_8850410_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SS_20260216T021313Z_8850410_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0ST_20260217T021316Z_8858968_X53_SM",
        "aika": "2026-02-17T02:13:21.407Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9728,
          27.9046,
          -16.4645,
          28.5617
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0ST_20260217T021316Z_8858968_X53_SM/ICEYE_ETH0ST_20260217T021316Z_8858968_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0ST_20260217T021316Z_8858968_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0ST_20260218T021319Z_8865667_X53_SM",
        "aika": "2026-02-18T02:13:24.026Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9733,
          27.9052,
          -16.465,
          28.562
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0ST_20260218T021319Z_8865667_X53_SM/ICEYE_ETH0ST_20260218T021319Z_8865667_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0ST_20260218T021319Z_8865667_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SK_20260219T021322Z_8871777_X53_SM",
        "aika": "2026-02-19T02:13:26.986Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9755,
          27.9037,
          -16.467,
          28.5608
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SK_20260219T021322Z_8871777_X53_SM/ICEYE_ETH0SK_20260219T021322Z_8871777_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SK_20260219T021322Z_8871777_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SK_20260220T021324Z_8887186_X53_SM",
        "aika": "2026-02-20T02:13:29.537Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9756,
          27.9043,
          -16.467,
          28.5612
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SK_20260220T021324Z_8887186_X53_SM/ICEYE_ETH0SK_20260220T021324Z_8887186_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SK_20260220T021324Z_8887186_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SK_20260221T021326Z_8911540_X53_SM",
        "aika": "2026-02-21T02:13:31.842Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.8,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9751,
          27.9042,
          -16.4663,
          28.5611
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SK_20260221T021326Z_8911540_X53_SM/ICEYE_ETH0SK_20260221T021326Z_8911540_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SK_20260221T021326Z_8911540_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SK_20260222T021329Z_8934050_X53_SM",
        "aika": "2026-02-22T02:13:34.461Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.7,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9764,
          27.9037,
          -16.4674,
          28.5609
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SK_20260222T021329Z_8934050_X53_SM/ICEYE_ETH0SK_20260222T021329Z_8934050_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SK_20260222T021329Z_8934050_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SK_20260223T021332Z_8955624_X53_SM",
        "aika": "2026-02-23T02:13:37.049Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.7,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.976,
          27.9039,
          -16.4695,
          28.5603
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SK_20260223T021332Z_8955624_X53_SM/ICEYE_ETH0SK_20260223T021332Z_8955624_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SK_20260223T021332Z_8955624_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SK_20260224T021333Z_8969467_X53_SM",
        "aika": "2026-02-24T02:13:38.948Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.7,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9734,
          27.9046,
          -16.4671,
          28.56
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SK_20260224T021333Z_8969467_X53_SM/ICEYE_ETH0SK_20260224T021333Z_8969467_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SK_20260224T021333Z_8969467_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SS_20260225T021336Z_8980777_X53_SM",
        "aika": "2026-02-25T02:13:41.052Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.7,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9721,
          27.9036,
          -16.4654,
          28.5599
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SS_20260225T021336Z_8980777_X53_SM/ICEYE_ETH0SS_20260225T021336Z_8980777_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SS_20260225T021336Z_8980777_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0SK_20260226T021339Z_8992815_X53_SM",
        "aika": "2026-02-26T02:13:44.762Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 25.7,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9786,
          27.9034,
          -16.4717,
          28.5596
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0SK_20260226T021339Z_8992815_X53_SM/ICEYE_ETH0SK_20260226T021339Z_8992815_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0SK_20260226T021339Z_8992815_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0TW_20260227T021343Z_9004927_X53_SM",
        "aika": "2026-02-27T02:13:48.198Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 26.3,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9159,
          27.9142,
          -16.4119,
          28.5704
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0TW_20260227T021343Z_9004927_X53_SM/ICEYE_ETH0TW_20260227T021343Z_9004927_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0TW_20260227T021343Z_9004927_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0TW_20260228T021345Z_9024068_X53_SM",
        "aika": "2026-02-28T02:13:50.924Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 26.3,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9167,
          27.9139,
          -16.4127,
          28.5697
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0TW_20260228T021345Z_9024068_X53_SM/ICEYE_ETH0TW_20260228T021345Z_9024068_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_ETH0TW_20260228T021345Z_9024068_X53_SM.json"
      },
      {
        "id": "ICEYE_ETH0TY_20260301T021347Z_9040941_X53_SM",
        "aika": "2026-03-01T02:13:52.975Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 26.3,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.14.6",
        "alue": [
          -16.9147,
          27.915,
          -16.4107,
          28.5708
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stacks/tenerife/ICEYE_ETH0TY_20260301T021347Z_9040941_X53_SM/ICEYE_ETH0TY_20260301T021347Z_9040941_X53_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/03/ICEYE_ETH0TY_20260301T021347Z_9040941_X53_SM.json"
      }
    ]
  },
  {
    "tunnus": "napolinlahti",
    "nimi": "Napolinlahti",
    "seutu": "Italia",
    "selite": "Vesuviuksen rinteet ja Sorrenton niemi yhtenä kaistana.",
    "lat": 40.6629,
    "lon": 14.4977,
    "oletus": "ICEYE_SR4R1X_20260818T102226Z_10335520_X49_SM",
    "havainnot": [
      {
        "id": "ICEYE_SR4R1X_20260818T102226Z_10335520_X49_SM",
        "aika": "2026-08-18T10:22:31.597Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X49",
        "katselukulma": 27.3,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.17.5",
        "alue": [
          14.0791,
          40.4321,
          14.9162,
          40.8938
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stripmap/ICEYE_SR4R1X_20260818T102226Z_10335520_X49_SM/ICEYE_SR4R1X_20260818T102226Z_10335520_X49_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/08/ICEYE_SR4R1X_20260818T102226Z_10335520_X49_SM.json"
      }
    ]
  },
  {
    "tunnus": "panama",
    "nimi": "Panaman kanavan suu",
    "seutu": "Panama",
    "selite": "Laivat odottavat vuoroaan kanavalle: jokainen valkoinen täplä on alus.",
    "lat": 8.8975,
    "lon": -79.5257,
    "oletus": "ICEYE_D1X6W7_20251107T033325Z_6934720_X50_SLH",
    "havainnot": [
      {
        "id": "ICEYE_D1X6W7_20251107T033325Z_6934720_X50_SLH",
        "aika": "2025-11-07T03:33:28.002Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 32.6,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          -79.5533,
          8.8702,
          -79.4982,
          8.9249
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot/ICEYE_D1X6W7_20251107T033325Z_6934720_X50_SLH/ICEYE_D1X6W7_20251107T033325Z_6934720_X50_SLH_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_D1X6W7_20251107T033325Z_6934720_X50_SLH.json"
      }
    ]
  },
  {
    "tunnus": "niagara",
    "nimi": "Niagaran putoukset",
    "seutu": "Kanada ja Yhdysvallat",
    "selite": "Putousten kaari ja kaksi kaupunkia joen molemmin puolin.",
    "lat": 43.0809,
    "lon": -79.0707,
    "oletus": "ICEYE_DPXV0D_20241001T030331Z_4271578_X31_SLEDF",
    "havainnot": [
      {
        "id": "ICEYE_DPXV0D_20241001T030331Z_4271578_X31_SLEDF",
        "aika": "2024-10-01T03:03:39.446Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 27.8,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.18",
        "alue": [
          -79.108,
          43.0534,
          -79.0327,
          43.1085
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_DPXV0D_20241001T030331Z_4271578_X31_SLEDF/ICEYE_DPXV0D_20241001T030331Z_4271578_X31_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/10/ICEYE_DPXV0D_20241001T030331Z_4271578_X31_SLEDF.json"
      },
      {
        "id": "ICEYE_DPXV0D_20251104T133802Z_6893776_X49_SLEDF",
        "aika": "2025-11-04T13:38:16.955Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X49",
        "katselukulma": 35.7,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          -79.1118,
          43.0509,
          -79.0303,
          43.1107
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_DPXV0D_20251104T133802Z_6893776_X49_SLEDF/ICEYE_DPXV0D_20251104T133802Z_6893776_X49_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_DPXV0D_20251104T133802Z_6893776_X49_SLEDF.json"
      }
    ]
  },
  {
    "tunnus": "losangeles",
    "nimi": "Los Angelesin satama",
    "seutu": "Yhdysvallat",
    "selite": "Konttiterminaalit ja nosturirivit, joiden metalli loistaa tutkassa.",
    "lat": 33.7518,
    "lon": -118.2302,
    "oletus": "ICEYE_9Q5BJ8_20260827T082949Z_10397370_X52_SLEA",
    "havainnot": [
      {
        "id": "ICEYE_9Q5BJ8_20260827T082949Z_10397370_X52_SLEA",
        "aika": "2026-08-27T08:29:55.918Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X52",
        "katselukulma": 25.5,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.18.1",
        "alue": [
          -118.3373,
          33.6645,
          -118.1232,
          33.8391
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_9Q5BJ8_20260827T082949Z_10397370_X52_SLEA/ICEYE_9Q5BJ8_20260827T082949Z_10397370_X52_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/08/ICEYE_9Q5BJ8_20260827T082949Z_10397370_X52_SLEA.json"
      }
    ]
  },
  {
    "tunnus": "fort-mcmurray",
    "nimi": "Fort McMurray",
    "seutu": "Alberta, Kanada",
    "selite": "Kaksi viikkoa peräkkäisiä kuvauksia kevättulvan aikaan.",
    "lat": 56.6825,
    "lon": -111.2863,
    "oletus": "ICEYE_CD0F7W_20260512T164356Z_9670317_X46_SLEA",
    "havainnot": [
      {
        "id": "ICEYE_CD0F7W_20260429T045709Z_9597231_X31_SLEA",
        "aika": "2026-04-29T04:57:15.768Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 25.4,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.456,
          56.5913,
          -111.12,
          56.773
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260429T045709Z_9597231_X31_SLEA/ICEYE_CD0F7W_20260429T045709Z_9597231_X31_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_CD0F7W_20260429T045709Z_9597231_X31_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260429T061322Z_9598105_X46_SLEA",
        "aika": "2026-04-29T06:13:28.823Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X46",
        "katselukulma": 27.2,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4463,
          56.5982,
          -111.1288,
          56.7674
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260429T061322Z_9598105_X46_SLEA/ICEYE_CD0F7W_20260429T061322Z_9598105_X46_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_CD0F7W_20260429T061322Z_9598105_X46_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260429T171147Z_9602100_X50_SLEA",
        "aika": "2026-04-29T17:11:53.284Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 22,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4431,
          56.5976,
          -111.1232,
          56.7682
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260429T171147Z_9602100_X50_SLEA/ICEYE_CD0F7W_20260429T171147Z_9602100_X50_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_CD0F7W_20260429T171147Z_9602100_X50_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260429T210542Z_9603897_X56_SLEA",
        "aika": "2026-04-29T21:05:48.255Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X56",
        "katselukulma": 25,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4473,
          56.5978,
          -111.1282,
          56.7679
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260429T210542Z_9603897_X56_SLEA/ICEYE_CD0F7W_20260429T210542Z_9603897_X56_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_CD0F7W_20260429T210542Z_9603897_X56_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260430T080228Z_9606649_X56_SLEA",
        "aika": "2026-04-30T08:02:34.408Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X56",
        "katselukulma": 23.3,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4431,
          56.5975,
          -111.1235,
          56.7682
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260430T080228Z_9606649_X56_SLEA/ICEYE_CD0F7W_20260430T080228Z_9606649_X56_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_CD0F7W_20260430T080228Z_9606649_X56_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260430T192515Z_9609881_X42_SLEA",
        "aika": "2026-04-30T19:25:21.055Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 37.3,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4573,
          56.5882,
          -111.1109,
          56.7763
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260430T192515Z_9609881_X42_SLEA/ICEYE_CD0F7W_20260430T192515Z_9609881_X42_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_CD0F7W_20260430T192515Z_9609881_X42_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260501T053113Z_9613983_X31_SLEA",
        "aika": "2026-05-01T05:31:19.373Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 34.4,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4414,
          56.5992,
          -111.1272,
          56.7662
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260501T053113Z_9613983_X31_SLEA/ICEYE_CD0F7W_20260501T053113Z_9613983_X31_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260501T053113Z_9613983_X31_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260501T135258Z_9616496_X63_SLEA",
        "aika": "2026-05-01T13:53:04.467Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X63",
        "katselukulma": 20.8,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4516,
          56.5903,
          -111.1136,
          56.7737
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260501T135258Z_9616496_X63_SLEA/ICEYE_CD0F7W_20260501T135258Z_9616496_X63_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260501T135258Z_9616496_X63_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260501T205826Z_9619997_X55_SLEA",
        "aika": "2026-05-01T20:58:32.165Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X55",
        "katselukulma": 33.6,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4443,
          56.5992,
          -111.1298,
          56.7663
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260501T205826Z_9619997_X55_SLEA/ICEYE_CD0F7W_20260501T205826Z_9619997_X55_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260501T205826Z_9619997_X55_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260501T215320Z_9620479_X53_SLEA",
        "aika": "2026-05-01T21:53:26.147Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X53",
        "katselukulma": 35.1,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4562,
          56.5888,
          -111.1117,
          56.7757
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260501T215320Z_9620479_X53_SLEA/ICEYE_CD0F7W_20260501T215320Z_9620479_X53_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260501T215320Z_9620479_X53_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260502T210410Z_9627202_X55_SLEA",
        "aika": "2026-05-02T21:04:16.095Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X55",
        "katselukulma": 26.4,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4468,
          56.598,
          -111.1284,
          56.7676
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260502T210410Z_9627202_X55_SLEA/ICEYE_CD0F7W_20260502T210410Z_9627202_X55_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260502T210410Z_9627202_X55_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260503T181649Z_9634622_X61_SLEA",
        "aika": "2026-05-03T18:16:54.918Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X61",
        "katselukulma": 31.7,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4447,
          56.5989,
          -111.1297,
          56.7665
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260503T181649Z_9634622_X61_SLEA/ICEYE_CD0F7W_20260503T181649Z_9634622_X61_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260503T181649Z_9634622_X61_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260504T182452Z_9641532_X31_SLEA",
        "aika": "2026-05-04T18:24:58.803Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 30.4,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4454,
          56.5985,
          -111.1291,
          56.767
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260504T182452Z_9641532_X31_SLEA/ICEYE_CD0F7W_20260504T182452Z_9641532_X31_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260504T182452Z_9641532_X31_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260505T183259Z_9650181_X42_SLEA",
        "aika": "2026-05-05T18:33:05.446Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 34.2,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4438,
          56.5994,
          -111.1302,
          56.766
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260505T183259Z_9650181_X42_SLEA/ICEYE_CD0F7W_20260505T183259Z_9650181_X42_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260505T183259Z_9650181_X42_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260506T184139Z_9653784_X42_SLEA",
        "aika": "2026-05-06T18:41:45.883Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 23.3,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4477,
          56.5976,
          -111.1282,
          56.7681
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260506T184139Z_9653784_X42_SLEA/ICEYE_CD0F7W_20260506T184139Z_9653784_X42_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260506T184139Z_9653784_X42_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260507T182844Z_9657327_X31_SLEA",
        "aika": "2026-05-07T18:28:50.776Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 24.5,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4471,
          56.5979,
          -111.1285,
          56.7678
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260507T182844Z_9657327_X31_SLEA/ICEYE_CD0F7W_20260507T182844Z_9657327_X31_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260507T182844Z_9657327_X31_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260508T213818Z_9660703_X55_SLEA",
        "aika": "2026-05-08T21:38:24.625Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X55",
        "katselukulma": 24.2,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4527,
          56.5902,
          -111.1134,
          56.774
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260508T213818Z_9660703_X55_SLEA/ICEYE_CD0F7W_20260508T213818Z_9660703_X55_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260508T213818Z_9660703_X55_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260509T162729Z_9662788_X46_SLEA",
        "aika": "2026-05-09T16:27:35.69Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X46",
        "katselukulma": 39.5,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4606,
          56.5881,
          -111.1135,
          56.7765
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260509T162729Z_9662788_X46_SLEA/ICEYE_CD0F7W_20260509T162729Z_9662788_X46_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260509T162729Z_9662788_X46_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260510T163258Z_9664868_X46_SLEA",
        "aika": "2026-05-10T16:33:04.554Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X46",
        "katselukulma": 33.8,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4593,
          56.589,
          -111.1154,
          56.7755
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260510T163258Z_9664868_X46_SLEA/ICEYE_CD0F7W_20260510T163258Z_9664868_X46_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260510T163258Z_9664868_X46_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260511T163827Z_9667475_X46_SLEA",
        "aika": "2026-05-11T16:38:33.596Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X46",
        "katselukulma": 27.2,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.4581,
          56.5899,
          -111.1176,
          56.7744
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260511T163827Z_9667475_X46_SLEA/ICEYE_CD0F7W_20260511T163827Z_9667475_X46_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260511T163827Z_9667475_X46_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260512T164356Z_9670317_X46_SLEA",
        "aika": "2026-05-12T16:44:02.781Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X46",
        "katselukulma": 19.9,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.457,
          56.5908,
          -111.1204,
          56.7732
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260512T164356Z_9670317_X46_SLEA/ICEYE_CD0F7W_20260512T164356Z_9670317_X46_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260512T164356Z_9670317_X46_SLEA.json"
      },
      {
        "id": "ICEYE_CD0F7W_20260514T050511Z_9675855_X42_SLEA",
        "aika": "2026-05-14T05:05:17.82Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 24.8,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.1.6",
        "alue": [
          -111.458,
          56.59,
          -111.1181,
          56.7742
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-extended-area/ICEYE_CD0F7W_20260514T050511Z_9675855_X42_SLEA/ICEYE_CD0F7W_20260514T050511Z_9675855_X42_SLEA_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_CD0F7W_20260514T050511Z_9675855_X42_SLEA.json"
      }
    ]
  },
  {
    "tunnus": "fort-simpson",
    "nimi": "Fort Simpson",
    "seutu": "Luoteisterritoriot, Kanada",
    "selite": "Kylä saarella Mackenzie- ja Liard-jokien yhtymäkohdassa, kuvattuna jäidenlähdön aikaan.",
    "lat": 61.8782,
    "lon": -121.3689,
    "oletus": "ICEYE_C718N0_20260501T193300Z_9619633_X42_SLEDF",
    "havainnot": [
      {
        "id": "ICEYE_C718N0_20260323T193105Z_9371887_X44_SLEDF",
        "aika": "2026-03-23T19:31:13.479Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X44",
        "katselukulma": 26.2,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4265,
          61.8511,
          -121.3117,
          61.9053
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260323T193105Z_9371887_X44_SLEDF/ICEYE_C718N0_20260323T193105Z_9371887_X44_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/03/ICEYE_C718N0_20260323T193105Z_9371887_X44_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260501T193300Z_9619633_X42_SLEDF",
        "aika": "2026-05-01T19:33:08.63Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 20.2,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4273,
          61.8508,
          -121.3111,
          61.9057
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260501T193300Z_9619633_X42_SLEDF/ICEYE_C718N0_20260501T193300Z_9619633_X42_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260501T193300Z_9619633_X42_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260502T194742Z_9626902_X35_SLEDF",
        "aika": "2026-05-02T19:47:48.98Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X35",
        "katselukulma": 26.3,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4267,
          61.8511,
          -121.3115,
          61.9054
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260502T194742Z_9626902_X35_SLEDF/ICEYE_C718N0_20260502T194742Z_9626902_X35_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260502T194742Z_9626902_X35_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260503T194952Z_9635031_X61_SLEDF",
        "aika": "2026-05-03T19:49:59.772Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X61",
        "katselukulma": 30.9,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4308,
          61.8489,
          -121.3066,
          61.9075
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260503T194952Z_9635031_X61_SLEDF/ICEYE_C718N0_20260503T194952Z_9635031_X61_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260503T194952Z_9635031_X61_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260504T195148Z_9642215_X35_SLEDF",
        "aika": "2026-05-04T19:51:54.47Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X35",
        "katselukulma": 20.4,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4273,
          61.8508,
          -121.3111,
          61.9057
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260504T195148Z_9642215_X35_SLEDF/ICEYE_C718N0_20260504T195148Z_9642215_X35_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260504T195148Z_9642215_X35_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260505T200739Z_9650182_X42_SLEDF",
        "aika": "2026-05-05T20:07:48.26Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 23.4,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4306,
          61.8489,
          -121.3066,
          61.9075
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260505T200739Z_9650182_X42_SLEDF/ICEYE_C718N0_20260505T200739Z_9650182_X42_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260505T200739Z_9650182_X42_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260506T190120Z_9653882_X61_SLEDF",
        "aika": "2026-05-06T19:01:28.229Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X61",
        "katselukulma": 35,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4253,
          61.8517,
          -121.3127,
          61.9048
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260506T190120Z_9653882_X61_SLEDF/ICEYE_C718N0_20260506T190120Z_9653882_X61_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260506T190120Z_9653882_X61_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260507T175742Z_9657069_X50_SLEDF",
        "aika": "2026-05-07T17:57:51.961Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 37.2,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4247,
          61.8518,
          -121.3129,
          61.9046
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260507T175742Z_9657069_X50_SLEDF/ICEYE_C718N0_20260507T175742Z_9657069_X50_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260507T175742Z_9657069_X50_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260508T175904Z_9660176_X46_SLEDF",
        "aika": "2026-05-08T17:59:14.102Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X46",
        "katselukulma": 38.5,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4245,
          61.8519,
          -121.3131,
          61.9045
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260508T175904Z_9660176_X46_SLEDF/ICEYE_C718N0_20260508T175904Z_9660176_X46_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260508T175904Z_9660176_X46_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260509T194654Z_9663209_X61_SLEDF",
        "aika": "2026-05-09T19:47:01.829Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X61",
        "katselukulma": 27.6,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4304,
          61.849,
          -121.3068,
          61.9073
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260509T194654Z_9663209_X61_SLEDF/ICEYE_C718N0_20260509T194654Z_9663209_X61_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260509T194654Z_9663209_X61_SLEDF.json"
      },
      {
        "id": "ICEYE_C718N0_20260510T191524Z_9664929_X42_SLEDF",
        "aika": "2026-05-10T19:15:33.756Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 38.5,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -121.4247,
          61.8519,
          -121.3133,
          61.9045
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_C718N0_20260510T191524Z_9664929_X42_SLEDF/ICEYE_C718N0_20260510T191524Z_9664929_X42_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/05/ICEYE_C718N0_20260510T191524Z_9664929_X42_SLEDF.json"
      }
    ]
  },
  {
    "tunnus": "juneau",
    "nimi": "Juneau",
    "seutu": "Alaska, Yhdysvallat",
    "selite": "Vuonon pohjukan kaupunki jäätiköiden ja jyrkkien rinteiden välissä.",
    "lat": 58.295,
    "lon": -134.4242,
    "oletus": "ICEYE_C427TH_20251108T223806Z_6973216_X56_SLP3L",
    "havainnot": [
      {
        "id": "ICEYE_C427TH_20251108T223806Z_6973216_X56_SLP3L",
        "aika": "2025-11-08T22:38:14.691Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X56",
        "katselukulma": 24.8,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          -134.4754,
          58.268,
          -134.373,
          58.3219
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-precise/ICEYE_C427TH_20251108T223806Z_6973216_X56_SLP3L/ICEYE_C427TH_20251108T223806Z_6973216_X56_SLP3L_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_C427TH_20251108T223806Z_6973216_X56_SLP3L.json"
      },
      {
        "id": "ICEYE_C427TH_20251111T175800Z_7033950_X50_SLED",
        "aika": "2025-11-11T17:58:15.892Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X50",
        "katselukulma": 39.3,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          -134.4802,
          58.2655,
          -134.3682,
          58.3245
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_C427TH_20251111T175800Z_7033950_X50_SLED/ICEYE_C427TH_20251111T175800Z_7033950_X50_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_C427TH_20251111T175800Z_7033950_X50_SLED.json"
      }
    ]
  },
  {
    "tunnus": "ucayali",
    "nimi": "Ucayali",
    "seutu": "Peru",
    "selite": "Amazonin latvajoen mutkat sademetsässä, jossa pilvet eivät haittaa tutkaa.",
    "lat": -8.3932,
    "lon": -74.5193,
    "oletus": "ICEYE_6QE022_20260401T152903Z_9431117_X42_SLEDF",
    "havainnot": [
      {
        "id": "ICEYE_6QE022_20260331T033546Z_9417828_X44_SLEDF",
        "aika": "2026-03-31T03:35:56.08Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X44",
        "katselukulma": 37.5,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -74.5459,
          -8.4197,
          -74.4927,
          -8.3667
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_6QE022_20260331T033546Z_9417828_X44_SLEDF/ICEYE_6QE022_20260331T033546Z_9417828_X44_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/03/ICEYE_6QE022_20260331T033546Z_9417828_X44_SLEDF.json"
      },
      {
        "id": "ICEYE_6QE022_20260401T152903Z_9431117_X42_SLEDF",
        "aika": "2026-04-01T15:29:11.923Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X42",
        "katselukulma": 26,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          -74.5463,
          -8.4199,
          -74.4925,
          -8.3664
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_6QE022_20260401T152903Z_9431117_X42_SLEDF/ICEYE_6QE022_20260401T152903Z_9431117_X42_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/04/ICEYE_6QE022_20260401T152903Z_9431117_X42_SLEDF.json"
      }
    ]
  },
  {
    "tunnus": "victorian-putoukset",
    "nimi": "Victorian putoukset",
    "seutu": "Sambia ja Zimbabwe",
    "selite": "Sambesin kuilu ja putousten reuna; alapuolella siksakkaava rotko.",
    "lat": -17.9359,
    "lon": 25.855,
    "oletus": "ICEYE_KSF6H2_20230713T073705Z_2358875_X2_SLED",
    "havainnot": [
      {
        "id": "ICEYE_KSF6H2_20230713T073705Z_2358875_X2_SLED",
        "aika": "2023-07-13T07:37:13.71Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X2",
        "katselukulma": 24.7,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.18",
        "alue": [
          25.8265,
          -17.9562,
          25.8826,
          -17.9025
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_KSF6H2_20230713T073705Z_2358875_X2_SLED/ICEYE_KSF6H2_20230713T073705Z_2358875_X2_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2023/07/ICEYE_KSF6H2_20230713T073705Z_2358875_X2_SLED.json"
      },
      {
        "id": "ICEYE_KSF3UM_20260219T090116Z_8872314_X46_SLED",
        "aika": "2026-02-19T09:01:25.97Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X46",
        "katselukulma": 35.7,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          25.8272,
          -17.9695,
          25.8837,
          -17.9154
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell/ICEYE_KSF3UM_20260219T090116Z_8872314_X46_SLED/ICEYE_KSF3UM_20260219T090116Z_8872314_X46_SLED_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_KSF3UM_20260219T090116Z_8872314_X46_SLED.json"
      }
    ]
  },
  {
    "tunnus": "kaohsiung",
    "nimi": "Kaohsiung",
    "seutu": "Taiwan",
    "selite": "Yksi maailman vilkkaimmista konttisatamista kahtena eri vuonna.",
    "lat": 22.5937,
    "lon": 120.9943,
    "oletus": "ICEYE_WSN093_20241001T140426Z_4273768_X31_SLEDF",
    "havainnot": [
      {
        "id": "ICEYE_WSN093_20241001T140426Z_4273768_X31_SLEDF",
        "aika": "2024-10-01T14:04:37.667Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X31",
        "katselukulma": 20.4,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          120.9654,
          22.5669,
          121.0232,
          22.6205
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_WSN093_20241001T140426Z_4273768_X31_SLEDF/ICEYE_WSN093_20241001T140426Z_4273768_X31_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/10/ICEYE_WSN093_20241001T140426Z_4273768_X31_SLEDF.json"
      },
      {
        "id": "ICEYE_WSN093_20251105T024036Z_6903389_X35_SLEDF",
        "aika": "2025-11-05T02:40:47.456Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X35",
        "katselukulma": 31.1,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          120.966,
          22.5674,
          121.0227,
          22.62
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_WSN093_20251105T024036Z_6903389_X35_SLEDF/ICEYE_WSN093_20251105T024036Z_6903389_X35_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_WSN093_20251105T024036Z_6903389_X35_SLEDF.json"
      }
    ]
  },
  {
    "tunnus": "zhengzhou",
    "nimi": "Zhengzhou",
    "seutu": "Kiina",
    "selite": "Suurkaupungin ruutukaava, jonka korttelit erottuvat teräväreunaisina.",
    "lat": 34.7475,
    "lon": 113.7818,
    "oletus": "ICEYE_WW0VTJ_20251104T180912Z_6897043_X25_SLEDF",
    "havainnot": [
      {
        "id": "ICEYE_WW0VTJ_20240727T144658Z_4171290_X35_SLEDF",
        "aika": "2024-07-27T14:47:10.808Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X35",
        "katselukulma": 33.7,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          113.75,
          34.7213,
          113.8134,
          34.7737
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_WW0VTJ_20240727T144658Z_4171290_X35_SLEDF/ICEYE_WW0VTJ_20240727T144658Z_4171290_X35_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2024/07/ICEYE_WW0VTJ_20240727T144658Z_4171290_X35_SLEDF.json"
      },
      {
        "id": "ICEYE_WW0VTJ_20251104T180912Z_6897043_X25_SLEDF",
        "aika": "2025-11-04T18:09:22.926Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X25",
        "katselukulma": 31,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.4",
        "alue": [
          113.7488,
          34.7203,
          113.8148,
          34.7748
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_WW0VTJ_20251104T180912Z_6897043_X25_SLEDF/ICEYE_WW0VTJ_20251104T180912Z_6897043_X25_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/11/ICEYE_WW0VTJ_20251104T180912Z_6897043_X25_SLEDF.json"
      }
    ]
  },
  {
    "tunnus": "port-klang",
    "nimi": "Port Klang",
    "seutu": "Malesia",
    "selite": "Malakan salmen satama ja sen mutaiset rannikkovedet.",
    "lat": 2.6882,
    "lon": 101.2894,
    "oletus": "ICEYE_W22P2C_20260204T041748Z_8730851_X44_SLF2L",
    "havainnot": [
      {
        "id": "ICEYE_W22P2C_20260204T041748Z_8730851_X44_SLF2L",
        "aika": "2026-02-04T04:17:51.608Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X44",
        "katselukulma": 34.7,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.1.5",
        "alue": [
          101.2654,
          2.664,
          101.3134,
          2.7123
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/spot-fine/ICEYE_W22P2C_20260204T041748Z_8730851_X44_SLF2L/ICEYE_W22P2C_20260204T041748Z_8730851_X44_SLF2L_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/02/ICEYE_W22P2C_20260204T041748Z_8730851_X44_SLF2L.json"
      }
    ]
  },
  {
    "tunnus": "adelaide-river",
    "nimi": "Adelaide Riverin seutu",
    "seutu": "Pohjoisterritorio, Australia",
    "selite": "Trooppinen tulvatasanko sadekauden lopulla, vesi mustana pensaikon seassa.",
    "lat": -13.7841,
    "lon": 130.7125,
    "oletus": "ICEYE_QVSCW6_20260320T232133Z_9353325_X49_SLEDF",
    "havainnot": [
      {
        "id": "ICEYE_QVSCW6_20260320T232133Z_9353325_X49_SLEDF",
        "aika": "2026-03-20T23:21:41.531Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X49",
        "katselukulma": 21.1,
        "rata": "descending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          130.6797,
          -13.8164,
          130.7451,
          -13.7526
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_QVSCW6_20260320T232133Z_9353325_X49_SLEDF/ICEYE_QVSCW6_20260320T232133Z_9353325_X49_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/03/ICEYE_QVSCW6_20260320T232133Z_9353325_X49_SLEDF.json"
      },
      {
        "id": "ICEYE_QVSCW6_20260325T180609Z_9384281_X38_SLEDF",
        "aika": "2026-03-25T18:06:17.788Z",
        "tila": "spotlight",
        "satelliitti": "ICEYE-X38",
        "katselukulma": 31.1,
        "rata": "ascending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_I_1.5.12",
        "alue": [
          130.6854,
          -13.8102,
          130.7396,
          -13.7572
        ],
        "tuotteet": [
          "CSI",
          "GRD",
          "QLK",
          "SLC",
          "VID"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/dwell-fine/ICEYE_QVSCW6_20260325T180609Z_9384281_X38_SLEDF/ICEYE_QVSCW6_20260325T180609Z_9384281_X38_SLEDF_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/03/ICEYE_QVSCW6_20260325T180609Z_9384281_X38_SLEDF.json"
      }
    ]
  },
  {
    "tunnus": "thwaites",
    "nimi": "Thwaitesin jäätikkö",
    "seutu": "Antarktis",
    "selite": "Jäätikön railokenttä ja kelluvan kielen reuna, kaksi vuotta peräkkäin.",
    "lat": -75.4823,
    "lon": -106.8247,
    "oletus": "ICEYE_1DS48U_20250106T083806Z_4441137_X6_SM",
    "havainnot": [
      {
        "id": "ICEYE_1DS48U_20250106T083806Z_4441137_X6_SM",
        "aika": "2025-01-06T08:38:11.499Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X6",
        "katselukulma": 19.2,
        "rata": "descending",
        "katse": "left",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.17.5",
        "alue": [
          -108.1455,
          -75.8256,
          -105.6242,
          -75.1152
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stripmap/ICEYE_1DS48U_20250106T083806Z_4441137_X6_SM/ICEYE_1DS48U_20250106T083806Z_4441137_X6_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2025/01/ICEYE_1DS48U_20250106T083806Z_4441137_X6_SM.json"
      },
      {
        "id": "ICEYE_1DS4D2_20260722T090947Z_10174906_X35_SM",
        "aika": "2026-07-22T09:09:52.172Z",
        "tila": "stripmap",
        "satelliitti": "ICEYE-X35",
        "katselukulma": 34,
        "rata": "ascending",
        "katse": "right",
        "polarisaatio": "VV",
        "kaista": "X",
        "kasittely": "ICEYE_P_1.17.5",
        "alue": [
          -107.9791,
          -75.8088,
          -105.5502,
          -75.1795
        ],
        "tuotteet": [
          "GRD",
          "QLK",
          "SLC"
        ],
        "kuva": "https://iceye-open-data-catalog.s3.amazonaws.com/data/stripmap/ICEYE_1DS4D2_20260722T090947Z_10174906_X35_SM/ICEYE_1DS4D2_20260722T090947Z_10174906_X35_SM_THM.png",
        "stac": "https://iceye-open-data-catalog.s3.amazonaws.com/stac-items/2026/07/ICEYE_1DS4D2_20260722T090947Z_10174906_X35_SM.json"
      }
    ]
  }
];
