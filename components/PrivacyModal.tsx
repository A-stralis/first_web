import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRIVACY_CONTENT = `
<style>
    .privacy-content h1, .privacy-content h2, .privacy-content h3 {
        color: #1d1d1f;
        margin-top: 2rem;
        font-weight: bold;
    }
    .privacy-content h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    .privacy-content h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    .privacy-content h4 { font-size: 1.1rem; margin-top: 1rem; margin-bottom: 0.5rem; font-weight: 600; }
    .privacy-content .section {
        margin-top: 1.5rem;
    }
    .privacy-content strong { color: #000; font-weight: 600; }
    .privacy-content ul { padding-left: 1.5rem; list-style-type: disc; margin-bottom: 1rem; }
    .privacy-content li { margin-bottom: 0.25rem; }
    .privacy-content .update-time {
        text-align: right;
        margin-top: 2rem;
        color: #999;
        font-size: 0.875rem;
    }
    .privacy-content p { margin-bottom: 1rem; }
    .privacy-content a { color: #2563eb; text-decoration: underline; }
</style>

<div class="privacy-content font-sans leading-relaxed text-stone-700">
<h1>🌌 宇宙安全声明</h1>
<div class="update-time">LAST UPDATE  2025.12</div>

<div class="section">
    <h3>重要提示</h3>
    <p>
        欢迎使用 XDFZ IMAGE(下称“本站”或“平台”).<strong>在提交任何照片或使用服务前,请务必完整阅读本声明.</strong>
    </p>
    <p>
        本站为校友个人开发运营的<strong>非营利性、非官方</strong>项目,与厦门大学附属实验中学官方无任何隶属关系.
        本站面向校友群体,旨在保存校园青春记忆,不用于任何商业用途.
        <strong>(所以其实下面都是例行声明XD)</strong>
    </p>
    <p>
        <strong>您提交投稿或继续使用网站,即表示您完全同意本声明.</strong>
    </p>
</div>
<div class="section">
    <h3>一、协议的接受与变更</h3>
    <p>1.1 使用本站即视为您接受本协议.</p>
    <p>
        1.2 <strong>本站有权随时更新本声明并在本页面公布,更新后立即生效.</strong>
        您有责任定期查阅.
    </p>
</div>
<div class="section">
    <h3>二、用户承诺与授权</h3>

    <h4>2.1 肖像权授权</h4>
    <ul>
        <li>确保您的投稿是善意的.</li>
        <li>并确保照片内容不涉及他人的隐私尴尬时刻.</li>
        <li>如果当事人提出异议，我们承诺在 24 小时内无条件删除.</li>
    </ul>

    <h4>2.2 著作权授权</h4>
    <ul>
        <li>您为照片的著作权人或已获得著作权人授权.</li>
        <li>
            您授权本站全球范围内、<strong>免许可费、非独占</strong>地展示照片,
            包括压缩、格式转换、在站内展示、存档等用途.
        </li>
        <li>您仍保留全部著作权.</li>
    </ul>

    <h4>2.3 责任承担</h4>
    <ul>
        <li>本站是一个非营利的小众社区，大家共同维护这里的纯净.</li>
        <li>如遇版权或肖像争议，我们会优先保护当事人权益进行下架处理，请投稿人知悉.</li>
    </ul>
</div>

<div class="section">
    <h3>三、内容规范</h3>
    <p>投稿内容不得包含以下情形:</p>
    <ul>
        <li>违反国家法律法规的内容.</li>
        <li>侵犯隐私、肖像权、名誉权等内容.</li>
        <li>色情、暴力、政治敏感信息.</li>
        <li>与附中无关的内容、广告或推广,比如在校外(非研学)的照片.</li>
        <li>模糊、重复、过曝等废片.</li>
        <li>AI 换脸、过度修图等误导性内容.</li>
    </ul>
</div>

<div class="section">
    <h3>四、知识产权</h3>
    <ul>
        <li>站内界面设计、文本等内容归本站运营者所有.</li>
        <li>用户投稿的照片之著作权按本声明第二条执行.</li>
        <li>未经明确书面许可,不得擅自复制本站内容.</li>
    </ul>
</div>
<div class="section">
    <h3>五、隐私政策(Privacy Policy)</h3>

    <h4>5.1 信息收集类型与用途</h4>
    <ul>
        <li><strong>浏览器指纹:</strong>仅用于防止重复点赞,不用于识别个人身份.</li>
        <li><strong>IP 地址:</strong>用于安全防护,不进行追踪或建档.</li>
        <li><strong>LocalStorage:</strong>用于存储阅读偏好,不上传服务器.</li>
    </ul>

    <p><strong>本站承诺:不进行用户画像、不进行广告投放、不出售任何用户数据.</strong></p>

    <h4>5.2 信息共享</h4>
    <p><strong>本站不会与任何第三方共享您的数据.</strong>法律要求除外.</p>

    <h4>5.3 用户权利</h4>
    <ul>
        <li>要求访问或更正个人信息.</li>
        <li>要求删除投稿照片及相关数据.</li>
    </ul>

    <h4>5.4 信息安全</h4>
    <p>本站采取合理安全措施,但无法保证绝对安全,请理解互联网风险.</p>
</div>
<div class="section">
    <h3>六、免责与责任限制</h3>
    <ul>
        <li>本站不保证投稿内容的真实性、完整性、合法性.</li>
        <li>因不可抗力造成的中断、丢失,本站不承担责任.</li>
        <li>用户违反本协议导致纠纷的,责任完全由用户承担.</li>
    </ul>
</div>
<div class="section">
    <h3>七、申诉与联系方式</h3>
    <p>如您发现本站内容侵犯了您的合法权益,请联系:</p>
    <a href="mailto:ssxxzzyyabab66@gmail.com">ssxxzzyyabab66@gmail.com</a>
</div>
<div class="section">
    <h3>八、其他规定</h3>
    <ul>
        <li>本协议适用中国大陆法律.</li>
        <li>争议由本站运营者所在地法院管辖.</li>
        <li>部分条款无效不影响整体效力.</li>
    </ul>
</div>
</div>
`;

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-3xl max-h-[85vh] rounded-lg shadow-2xl overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4 border-b border-stone-100 absolute right-0 top-0 z-10 w-full bg-white/90 backdrop-blur-sm">
           <button 
            onClick={onClose} 
            className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-8 pt-16 text-stone-800 h-full">
           <div dangerouslySetInnerHTML={{ __html: PRIVACY_CONTENT }} />
        </div>
      </div>
    </div>
  );
};