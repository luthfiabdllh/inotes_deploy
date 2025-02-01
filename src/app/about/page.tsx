"use client";

import { AppSidebar } from "@/components/app-sidebar"
import Editor from "@/components/editor/editor"
import { HeaderNote } from "@/components/header-note"
import { NavActions } from "@/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Note() {

    const data = [
        {
            "id": "GH1wmBWAQC",
            "data": {
                "text": "Olahraga merupakan salah satu aktivitas fisik yang penting untuk kesehatan. Olahraga dapat membantu menjaga kesehatan tubuh, meningkatkan kebugaran, dan mencegah berbagai penyakit.Meskipun demikian, berdasarkan laporan Sport Development Index (SDI) tahun 2021, hanya 35,7% penduduk Indonesia yang aktif berolahraga. Angka ini masih jauh di bawah standar yang ditetapkan oleh World Health Organization (WHO), yaitu 60%. Rendahnya minat olahraga di Indonesia disebabkan oleh beberapa faktor, yaitu kurangnya kesadaran masyarakat akan pentingnya berolahraga untuk mejaga kesehata, fasilitas dan infrastruktur yang tidak memadai, dan kurangnya dukungan dari pemerintah maupun swasta dalam pengembangan olahraga"
            },
            "type": "paragraph"
        },
        {
            "id": "Wdb7TeHwmi",
            "data": {
                "text": "Peningkatan minat olahraga di Indonesia memiliki banyak manfaat, antara lain:"
            },
            "type": "paragraph"
        },
        {
            "id": "Y4Wr74cZWn",
            "data": {
                "meta": {},
                "items": [
                    {
                        "meta": {},
                        "items": [],
                        "content": "Meningkatkan kesehatan masyarakat."
                    },
                    {
                        "meta": {},
                        "items": [],
                        "content": "Meningkatkan kualitas hidup masyarakat."
                    },
                    {
                        "meta": {},
                        "items": [],
                        "content": "Meningkatkan prestasi olahraga Indonesia di tingkat internasional."
                    },
                    {
                        "meta": {},
                        "items": [],
                        "content": "Manfaat Olahraga Bagi Kesehatan Masyarakat"
                    }
                ],
                "style": "unordered"
            },
            "type": "list"
        },
        {
            "id": "Dt2LlwbIpD",
            "data": {
                "text": "Olahraga memiliki banyak manfaat bagi kesehatan masyarakat, diantaranya menjaga kesehatan jantung dan pembuluh darah. Olahraga dapat membantu menurunkan tekanan darah, kolesterol, dan trigliserida. Hal ini dapat mengurangi risiko penyakit jantung, stroke, dan penyakit pembuluh darah lainnya, meningkatkan kebugaran fisik. Olahraga dapat membantu meningkatkan kekuatan otot, daya tahan, dan fleksibilitas. Hal ini dapat membantu meningkatkan kemampuan fisik untuk melakukan aktivitas sehari-hari. Mencegah berbagai penyakit. Olahraga dapat membantu mencegah berbagai penyakit, seperti obesitas, diabetes, kanker, dan osteoporosis. Meningkatkan kualitas hidup. Olahraga dapat membantu meningkatkan mood, mengurangi stres, dan meningkatkan rasa percaya diri."
            },
            "type": "paragraph"
        },
        {
            "id": "rjvQ-OrjxZ",
            "data": {
                "text": "Untuk meningkatkan minat olahraga di Indonesia, perlu dilakukan berbagai upaya, antara lain:"
            },
            "type": "paragraph"
        },
        {
            "id": "FGgo8OV7Vd",
            "data": {
                "meta": {},
                "items": [
                    {
                        "meta": {},
                        "items": [],
                        "content": "Sosialisasi dan edukasi tentang pentingnya olahraga untuk kesehatan. Sosialisasi dan edukasi dapat dilakukan melalui berbagai media, seperti televisi, radio, media sosial, dan sekolah."
                    },
                    {
                        "meta": {},
                        "items": [],
                        "content": "Peningkatan pembangunan fasilitas dan infrastruktur olahraga yang memadai. Fasilitas dan infrastruktur olahraga yang memadai dapat mendorong masyarakat untuk berolahraga."
                    },
                    {
                        "meta": {},
                        "items": [],
                        "content": "Peningkatan dukungan dari pemerintah dan swasta untuk pengembangan olahraga. Dukungan dari pemerintah dan swasta dapat membantu meningkatkan ketersediaan fasilitas dan infrastruktur olahraga, serta memberikan pelatihan dan pembinaan bagi atlet."
                    }
                ],
                "style": "unordered"
            },
            "type": "list"
        }
    ];
  return (
      <SidebarInset>
        {/* <HeaderNote /> */}
        {/* <Editor data={data}/> */}
      </SidebarInset>
  )
}
