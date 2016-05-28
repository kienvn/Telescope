import React, { PropTypes, Component } from 'react';
import { DocHead } from 'meteor/kadira:dochead';

class HeadTags extends Component {
	render() {
		DocHead.removeDocHeadAddedTags();

		const url = this.props.url ? this.props.url : Telescope.utils.getSiteUrl();
		const title = this.props.title ? this.props.title : Telescope.settings.get("title");
		///const description = this.props.description ? this.props.description : Telescope.settings.get("tagline");
		///const image = this.props.image ? this.props.image : Telescope.utils.getSiteUrl() + Telescope.settings.get("logoUrl");
		const image = "http://embed.sharetin.net/ShareTin.png";
		const description = "Tổng hợp, bình luận, tin nóng hổi từ nhiều nguồn khác nhau. Tin tức Việt Nam, thế giới về xã hội, kinh doanh, pháp luật, khoa học, công nghệ, sức khoẻ, đời sống, văn hóa, rao vặt, tâm sự...";
		const metas = [
			{ charset: "utf-8" },
			{ name: "description", content: description },
			{ name:"keywords", content:"ShareTin,Viet news Daily,Economy,Online,Internet,Magazine,Gateway,Viet Nam,Portal,Tin nhanh,cập nhật,binh luan, trao doi ,việt báo,tin việt,VietNews,mua bán,rao vặt,tư vấn,việc làm,Hà Nội,Sài Gòn,tin tức,Huế,Đà Nẵng,VDC,Netnam,Saigonnet,Sggp,VET,Nhân dân,Lao động,Kinh tế,Kinh doanh,Tin nhanh,cap nhat,bao dien tu,Vietbao,TinViet,Mua Ban,Rao Vat,Tu Van,Viec Lam,Hanoi,Ha Noi,Saigon,Sai gon,Tin tuc,Tintuc,Hue,Da Nang,Danang,Nhandan,Nhan dan,Laodong,Lao dong,Kinhte,Kinh te,Kinhdoanh,Kinh doanh"},
			{ property:"og:image", itemprop:"thumbnailUrl", content:image},
			{ name:"tt_category_id", content:"1000000"},
			{ name:"tt_article_id", content:"1000000"},
			{ name:"tt_site_id", content:"1000000"},
			{ name:"dc.created", content:"2016-05-10"},
			{ name:"dc.publisher", content:"ShareTin"},
			{ name:"dc.rights.copyright",content:"ShareTin"},
            {name:"dc.creator.name",content:"ShareTin"},
			{name:"dc.creator.email", content:"clopmob@gmail.com"},
			{name:"dc.identifier", content:"http://Sharetin.net"},
			{name:"copyright", content:"ShareTin"},
			{name:"author", content:"ShareTin"},
			{name:"dc.language", content:"vi-VN"},
			{name:"robots", content:"index,follow"},
			{"http-equiv":"content-language", content:"vi"},
            {name:"geo.placename", content:"Ha Noi, Viet Nam"},
			{name:"geo.region", content:"VN-HN"},
			{name:"geo.position", content:"21.026231; 105.849443"},
			{name:"ICBM", content:"21.026231; 105.849443"},
			{name:"revisit-after", content:"days"},
			// responsive
			{ name: "viewport", content:"width=device-width, initial-scale=1" },
			// facebook
			{ property: "og:type", content: "article" },
			{ property: "og:url", content: url },
			{ property: "og:image", content: image },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			//twitter
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:image:src", content: image },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description }
		];

		const links = [
			{ rel: "canonical", href: Telescope.utils.getSiteUrl() },
			{ rel: "shortcut icon", href: Telescope.settings.get("favicon", "/img/favicon.ico") }
		];

		return (
			<div>
				{ DocHead.setTitle(title) }
				{ metas.map(meta => DocHead.addMeta(meta)) }
				{ links.map(link => DocHead.addLink(link)) }
			</div>
		);
	}
}

HeadTags.propTypes = {
	url: React.PropTypes.string,
	title: React.PropTypes.string,
	description: React.PropTypes.string,
	image: React.PropTypes.string,
};

module.exports = HeadTags;
export default HeadTags;