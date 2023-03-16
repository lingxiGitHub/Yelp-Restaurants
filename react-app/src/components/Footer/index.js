import './Footer.css'

function Footer() {

    return (
        <div className='everyones-information-container'>
            <div className='le-div'>
                <p className='name'>Le Nguyen</p>
                <div className='link-div'>
                    <a className='github-button' href='https://github.com/ltnguyen517'><i class="fa-brands fa-github fa-1x"></i></a>
                    <a className='linkedin-button' href='https://www.linkedin.com/in/lenguyenmbs/' style={{fontFamily: 'Helvetica'}}><i class="fa-brands fa-linkedin"></i></a>
                </div>

            </div>
            <div className='sarah-div'>
                <p className='name'>Sarah Ling</p>
                <div className='link-div'>
                    <a className='github-button' href='https://github.com/lingxiGitHub'><i class="fa-brands fa-github fa-1x"></i></a>
                    <a className='linkedin-button' href='https://www.linkedin.com/in/xi-ling-cpa/' style={{fontFamily: 'Helvetica'}}><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
            <div className='ciara-div'>
                <p className='name'>Ciara Fumar Christensen</p>
                <div className='link-div'>
                    <a className='github-button' href='https://github.com/c-iarraa'><i class="fa-brands fa-github fa-1x"></i></a>
                    <a className='linkedin-button' href='https://www.linkedin.com/in/ciara-fumar-christensen-913972268/' style={{fontFamily: 'Helvetica'}}><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
            <div className='xiao-div'>
                <p className='name'>Xiaoguang Wang</p>
                <div className='link-div'>
                    <a className='github-button' href='https://github.com/guangxiaozhi'><i class="fa-brands fa-github fa-1x"></i></a>
                    <a className='linkedin-button' href='https://www.linkedin.com/in/xiaoguang-wang-096128265/' style={{fontFamily: 'Helvetica'}}><i class="fa-brands fa-linkedin"></i></a>
                </div>

            </div>
        </div>
    )
}

export default Footer;
