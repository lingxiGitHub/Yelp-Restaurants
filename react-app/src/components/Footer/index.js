import './Footer.css'

function Footer() {

    return (
        <div className='everyones-information-container'>
            <div className='le-div'>
                <p className='name'>Le Nguyen</p>
                <a className='github-button' href='https://github.com/ltnguyen517'><i class="fa-brands fa-github fa-1x"></i></a>
            </div>
            <div className='sarah-div'>
                <p className='name'>Sarah Ling</p>
                <a className='github-button' href='https://github.com/lingxiGitHub'><i class="fa-brands fa-github fa-1x"></i></a>
            </div>
            <div className='ciara-div'>
                <p className='name'>Ciara Fumar Christensen</p>
                <a className='github-button' href='https://github.com/c-iarraa'><i class="fa-brands fa-github fa-1x"></i></a>
            </div>
            <div className='xiao-div'>
                <p className='name'>Xiaoguang Wang</p>
                <a className='github-button' href='https://github.com/guangxiaozhi'><i class="fa-brands fa-github fa-1x"></i></a>
            </div>
        </div>
    )
}

export default Footer;
